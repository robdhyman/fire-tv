import { useLayoutEffect, useRef } from 'react'
import { animate, useMotionValue, useReducedMotion, type Transition, type Variants } from 'motion/react'
import { distance, duration, RAPID_INPUT_MS, spring, stagger } from './tokens'

/*
 * The motion tokens resolved for this viewer: full springs, or with reduced
 * motion (the OS setting, or `?motion=reduced` / `?motion=full` on load)
 * instant moves and short fades. Components ask for transitions here and
 * never write a spring or duration inline.
 */

const override = new URLSearchParams(window.location.search).get('motion')

export function useReduced(): boolean {
  const system = useReducedMotion() ?? false
  if (override === 'reduced') return true
  if (override === 'full') return false
  return system
}

// Input rate: arrow presses are timestamped by the focus engine.
let lastArrow = 0
let rapid = false
export function noteArrow() {
  const now = performance.now()
  rapid = now - lastArrow < RAPID_INPUT_MS
  lastArrow = now
}

const instant: Transition = { duration: 0 }
const fade = (seconds: number): Transition => ({ duration: seconds, ease: 'easeOut' })

export function useMotion() {
  const reduced = useReduced()
  const t = (s: Transition): Transition => (reduced ? instant : s)
  return {
    reduced,
    /** Tile and button focus: fast in (faster still under rapid input), slower out. */
    focus: (focused: boolean): Transition =>
      t(focused ? (rapid ? spring.focusInFast : spring.focusIn) : spring.focusOut),
    focusScale: reduced ? 1 : distance.focusScale,
    focusLift: reduced ? 0 : distance.focusLift,
    strip: t(spring.strip),
    morph: t(spring.morph),
    rise: t(spring.rise),
    fade: fade(reduced ? duration.reduced : duration.screenFade),
    heroFade: fade(reduced ? duration.reduced : duration.heroCrossfade),
    /** Opacity-only part of a screen: fades with the screen's enter/exit. */
    part: {
      hidden: { opacity: 0, transition: fade(reduced ? duration.reduced : duration.screenFade) },
      shown: { opacity: 1, transition: fade(reduced ? duration.reduced : duration.screenFade) },
    } satisfies Variants,
    /** A row or grid that staggers its tiles in as the screen enters. */
    stagger: (delay = 0): Variants => ({
      hidden: {},
      shown: { transition: reduced ? {} : { delayChildren: delay, staggerChildren: stagger.tile } },
    }),
    /** One tile settling into its row. */
    tile: {
      hidden: reduced
        ? { opacity: 0, transition: fade(duration.reduced) }
        : { opacity: 0, y: distance.tileEnter, transition: fade(duration.screenFade) },
      shown: reduced ? { opacity: 1, transition: fade(duration.reduced) } : { opacity: 1, y: 0, transition: spring.rise },
    } satisfies Variants,
  }
}

/*
 * Shared-element morph bookkeeping. Home's hero records what it handed to
 * the show page; the show page and the returning Home read it on mount.
 * `prevPath` is the screen we came from, updated by the route switcher.
 */
export type StageRect = { x: number; y: number; h: number }

export const morph = {
  /** Show whose hero was selected, with its Ken Burns progress and title box at that moment. */
  hero: null as null | { showId: string; kenBurns: number; title: StageRect | null },
  /** Where the show page's title rests, for the reverse morph. */
  showTitle: null as StageRect | null,
  prevPath: null as string | null,
}

/** An element's box in 1920x1080 stage pixels, whatever the window's scale. */
export function stageRect(el: Element | null): StageRect | null {
  const stage = el?.closest('.stage')
  if (!el || !stage) return null
  const s = stage.getBoundingClientRect()
  const k = s.width / 1920
  const r = el.getBoundingClientRect()
  return { x: (r.left - s.left) / k, y: (r.top - s.top) / k, h: r.height / k }
}

/**
 * Shared-element flight in stage pixels (FLIP): on mount the element is
 * offset and scaled to sit on `from`, then springs home on `transition`.
 * `onRest` gets the element's resting box. Spread `style` and attach `ref`.
 *
 * Done by hand rather than with `layoutId` because motion's projection
 * misplaces the start of a shared layout animation inside the scaled stage.
 */
export function useFlight<T extends HTMLElement>(
  from: StageRect | null,
  transition: Transition,
  onRest?: (rest: StageRect) => void,
) {
  const ref = useRef<T>(null)
  const rest = useRef<StageRect | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  useLayoutEffect(() => {
    // Measured once, before any offset is applied (StrictMode runs this twice).
    rest.current ??= stageRect(ref.current)
    const to = rest.current
    if (to) onRest?.(to)
    if (!from || !to || !to.h) return
    x.set(from.x - to.x)
    y.set(from.y - to.y)
    scale.set(from.h / to.h)
    // Motion renders on the next frame; paint the start pose now so the first frame isn't at rest.
    ref.current!.style.transform = `translateX(${x.get()}px) translateY(${y.get()}px) scale(${scale.get()})`
    const runs = [animate(x, 0, transition), animate(y, 0, transition), animate(scale, 1, transition)]
    return () => runs.forEach((r) => r.stop())
    // Fly once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { ref, style: { x, y, scale, originX: 0, originY: 0 } }
}

/** The hero's rectangle on the 1920x1080 stage, as a clip-path inset. */
export const HERO_CLIP = 'inset(130px 117px 278px 117px)'
export const FULL_CLIP = 'inset(0px 0px 0px 0px)'
