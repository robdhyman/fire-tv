import { useEffect, useState } from 'react'

/*
 * The remote's buttons and the keys they stand for. A button press is a
 * synthetic keydown on window, so it takes exactly the keyboard's path
 * through the focus engine and the screens. Physical keys light the
 * matching button.
 */

export type RemoteButton =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'select'
  | 'back'
  | 'home'
  | 'menu'
  | 'rewind'
  | 'playPause'
  | 'fastForward'

/** The key each button sends. */
export const SENDS: Record<RemoteButton, string> = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  select: 'Enter',
  back: 'Escape',
  home: 'Home',
  menu: 'ContextMenu',
  rewind: 'MediaRewind',
  playPause: 'MediaPlayPause',
  fastForward: 'MediaFastForward',
}

/** Physical keys that light a button (the sent key plus keyboard stand-ins). */
const LIGHTS: Record<string, RemoteButton> = {
  ...Object.fromEntries(Object.entries(SENDS).map(([b, k]) => [k, b as RemoteButton])),
  Backspace: 'back',
  ' ': 'playPause',
  m: 'menu',
  h: 'home',
}

export const LABELS: Record<RemoteButton, string> = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  select: 'select (enter)',
  back: 'back (esc)',
  home: 'home (h)',
  menu: 'menu (m)',
  rewind: 'rewind',
  playPause: 'play / pause (space)',
  fastForward: 'fast-forward',
}

const LIT_MS = 160

export function press(button: RemoteButton) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: SENDS[button], bubbles: true, cancelable: true }))
}

const inInput = (e: KeyboardEvent) => {
  const t = e.target as HTMLElement | null
  return t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA'
}

/** Which buttons are lit right now, from any keydown (physical or the remote's own). */
export function useLit() {
  const [lit, setLit] = useState<Set<RemoteButton>>(new Set())
  useEffect(() => {
    const timers = new Map<RemoteButton, number>()
    const onKey = (e: KeyboardEvent) => {
      if (inInput(e) && e.key.length === 1) return
      const b = LIGHTS[e.key]
      if (!b) return
      setLit((s) => new Set(s).add(b))
      clearTimeout(timers.get(b))
      timers.set(
        b,
        window.setTimeout(() => setLit((s) => {
          const n = new Set(s)
          n.delete(b)
          return n
        }), LIT_MS),
      )
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      timers.forEach((t) => clearTimeout(t))
    }
  }, [])
  return lit
}

/** Home and Menu outside the focus engine: Home goes to Home, Menu brings the controls hint back. */
export function useGlobalKeys(goHome: () => void, showHint: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (inInput(e)) return
      if (e.key === 'Home' || e.key === 'h') goHome()
      else if (e.key === 'ContextMenu' || e.key === 'm') showHint()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goHome, showHint])
}
