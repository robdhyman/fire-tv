import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { useIsPresent } from 'motion/react'
import { pickNeighbour, type Direction } from './geometry'
import { noteArrow } from '../motion/useMotion'

/*
 * Focus engine.
 *
 * Focus is app state: one focused element id, not the browser's tab order.
 * Focusables register their DOM node; arrow keys pick the nearest neighbour
 * from live bounding boxes; Enter selects; Esc/Backspace runs the top Back
 * handler. The stage ignores the mouse (Rob, 2 Nov review): only the keyboard
 * and the on-screen remote drive focus. Each screen remembers
 * its last focused id so returning to it restores the same focus path.
 * Every handled key reports what it did as a nav event (`onNav`), which the
 * nav sounds play (issue #29).
 */

/**
 * What a key did: focus moved (or a handler moved along, like the hero strip
 * or the Player's scrub), an item was selected, Back ran, or an arrow found
 * no neighbour in its lane (an edge bump).
 */
export type NavEvent = 'move' | 'select' | 'back' | 'bump'

type Entry = {
  id: string
  el: HTMLElement
  onSelect?: () => void
  /** Handle a key before spatial navigation. Return true to consume it. */
  onKey?: (key: string) => boolean
}

type Ctx = {
  focusedId: string | null
  setFocus: (id: string) => void
  register: (entry: Entry) => () => void
  has: (id: string) => boolean
  pushBack: (fn: () => void) => () => void
  memory: Map<string, string>
  onFirstArrow: (fn: () => void) => () => void
  onNav: (fn: (e: NavEvent) => void) => () => void
}

const FocusContext = createContext<Ctx | null>(null)

const DIRECTIONS: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

export function FocusProvider({ children }: { children: ReactNode }) {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const focusedRef = useRef<string | null>(null)
  const registry = useRef(new Map<string, Entry>())
  const backStack = useRef<Array<() => void>>([])
  const memory = useRef(new Map<string, string>())
  const arrowListeners = useRef(new Set<() => void>())
  const navListeners = useRef(new Set<(e: NavEvent) => void>())

  const setFocus = useCallback((id: string) => {
    focusedRef.current = id
    setFocusedId(id)
  }, [])

  const register = useCallback((entry: Entry) => {
    registry.current.set(entry.id, entry)
    return () => {
      if (registry.current.get(entry.id) === entry) registry.current.delete(entry.id)
    }
  }, [])

  const has = useCallback((id: string) => registry.current.has(id), [])

  const pushBack = useCallback((fn: () => void) => {
    backStack.current.push(fn)
    return () => {
      const i = backStack.current.lastIndexOf(fn)
      if (i >= 0) backStack.current.splice(i, 1)
    }
  }, [])

  const onFirstArrow = useCallback((fn: () => void) => {
    arrowListeners.current.add(fn)
    return () => {
      arrowListeners.current.delete(fn)
    }
  }, [])

  const onNav = useCallback((fn: (e: NavEvent) => void) => {
    navListeners.current.add(fn)
    return () => {
      navListeners.current.delete(fn)
    }
  }, [])

  useEffect(() => {
    const emit = (ev: NavEvent) => navListeners.current.forEach((fn) => fn(ev))
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const inInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA'
      const current = focusedRef.current ? registry.current.get(focusedRef.current) : undefined

      const dir = DIRECTIONS[e.key]
      if (dir) {
        noteArrow()
        arrowListeners.current.forEach((fn) => fn())
      }

      if (current?.onKey?.(e.key)) {
        e.preventDefault()
        if (dir) emit('move')
        else if (e.key === 'Enter') emit('select')
        return
      }

      if (dir) {
        e.preventDefault()
        if (!current) return
        // A screen fading out keeps its focusables until it unmounts; skip them.
        const live = [...registry.current.values()].filter(({ el }) => !el.closest('[data-exiting]'))
        const boxes = live.map(({ id, el }) => {
          const r = el.getBoundingClientRect()
          return { id, left: r.left, top: r.top, right: r.right, bottom: r.bottom }
        })
        const cur = boxes.find((b) => b.id === current.id)
        if (!cur) return
        const next = pickNeighbour(cur, boxes, dir)
        if (next) setFocus(next.id)
        emit(next ? 'move' : 'bump')
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        if (!current?.onSelect) return
        current.onSelect()
        emit('select')
        return
      }

      if (e.key === 'Escape' || (e.key === 'Backspace' && !(inInput && (target as HTMLInputElement).value))) {
        e.preventDefault()
        const back = backStack.current[backStack.current.length - 1]
        if (!back) return
        back()
        emit('back')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setFocus])

  return (
    <FocusContext.Provider
      value={{ focusedId, setFocus, register, has, pushBack, memory: memory.current, onFirstArrow, onNav }}
    >
      {children}
    </FocusContext.Provider>
  )
}

export function useFocusContext() {
  const ctx = useContext(FocusContext)
  if (!ctx) throw new Error('FocusProvider missing')
  return ctx
}

export function useFocusedId() {
  return useFocusContext().focusedId
}

type FocusableOptions = {
  onSelect?: () => void
  onKey?: (key: string) => boolean
  disabled?: boolean
}

export type FocusableProps<T extends HTMLElement = HTMLDivElement> = {
  ref: RefObject<T | null>
  'data-focus-id': string
  'data-focused'?: true
}

/** Register one focusable element. Spread `props` onto its DOM node. */
export function useFocusable<T extends HTMLElement = HTMLDivElement>(id: string, options: FocusableOptions = {}) {
  const { focusedId, register } = useFocusContext()
  const ref = useRef<T>(null)
  const optionsRef = useRef(options)
  optionsRef.current = options

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || options.disabled) return
    return register({
      id,
      el,
      get onSelect() {
        return optionsRef.current.onSelect
      },
      get onKey() {
        return optionsRef.current.onKey
      },
    })
  }, [id, register, options.disabled])

  const focused = focusedId === id
  const props: FocusableProps<T> = {
    ref,
    'data-focus-id': id,
    'data-focused': focused || undefined,
  }
  return { focused, props }
}

/** Register the Back handler for the screen (Esc / Backspace). */
export function useBack(handler: () => void) {
  const { pushBack } = useFocusContext()
  const ref = useRef(handler)
  ref.current = handler
  useEffect(() => pushBack(() => ref.current()), [pushBack])
}

/**
 * Give a screen its focus path: restore the id remembered for `key`, or
 * fall back to `defaultId`; then keep remembering as focus moves. With
 * `restore` false the screen starts on `defaultId` and still remembers.
 */
export function useScreenFocus(key: string, defaultId: string, restore = true) {
  const { focusedId, setFocus, has, memory } = useFocusContext()
  const ready = useRef(false)
  // Once the screen starts leaving, the next screen's focus is not ours to remember.
  const present = useIsPresent()

  useLayoutEffect(() => {
    ready.current = false
    const frame = requestAnimationFrame(() => {
      const saved = restore ? memory.get(key) : undefined
      setFocus(saved && has(saved) ? saved : defaultId)
      ready.current = true
    })
    return () => cancelAnimationFrame(frame)
    // Restore once per screen key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  useEffect(() => {
    if (present && ready.current && focusedId && has(focusedId)) memory.set(key, focusedId)
  }, [present, focusedId, key, has, memory])
}
