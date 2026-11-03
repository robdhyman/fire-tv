import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { animate, motion, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import { useFocusable } from '../focus/FocusEngine'
import { artUrl, type Show } from '../data/catalogue'
import { distance, duration } from '../motion/tokens'
import { FULL_CLIP, HERO_CLIP, HERO_RECT, morph, stageRect, useFlight, useMotion } from '../motion/useMotion'

export const HERO = { w: 1686, h: 672, gap: 25, left: 117 }

/** One hero panel plus the gap: how far the strip moves per show. */
const PITCH = HERO.w + HERO.gap

export const HERO_ID = 'hero'

/** The hero's current index per brand, so Back lands on the show it left from. */
const remembered = new Map<string, number>()

/**
 * Home's featured strip. Every hero show is a panel in one horizontal strip;
 * Left/Right slide the strip a panel on the `heroSlide` spring (a press
 * mid-slide retargets it). The centre panel sits on the hero rectangle at
 * full size with the focus ring; its neighbours peek in at the screen edges,
 * smaller and dimmed, and grow as they slide into the centre. Enter morphs
 * the centre panel's art and title into the show page; returning from that
 * show page plays the morph backwards.
 *
 * Each panel's art is the show page's full-bleed image clipped to the panel,
 * so the morph is the clip opening up, with no change of crop.
 */
export function Hero({ shows, memoryKey, onCurrent }: { shows: Show[]; memoryKey: string; onCurrent?: (show: Show) => void }) {
  const navigate = useNavigate()
  const m = useMotion()
  const [current, setCurrent] = useState(() => Math.min(remembered.get(memoryKey) ?? 0, shows.length - 1))
  const show = shows[current]

  // Coming back from this show's page (entered from the hero): start full-bleed and shrink.
  const [morphIn, setMorphIn] = useState(
    () => morph.hero?.showId === show.id && morph.prevPath === `/show/${show.id}`,
  )

  // The strip's offset; animating it again from wherever it is retargets mid-slide.
  const stripX = useMotionValue(-current * PITCH)
  useEffect(() => {
    const a = animate(stripX, -current * PITCH, m.heroSlide)
    return () => a.stop()
    // Only on a change of show; m.heroSlide is a fresh object every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, stripX])

  useEffect(() => {
    remembered.set(memoryKey, current)
    onCurrent?.(show)
  }, [current, show, memoryKey, onCurrent])

  const step = (d: number) => {
    const next = current + d
    if (next < 0 || next >= shows.length) return false
    setCurrent(next)
    return true
  }

  const { focused, props } = useFocusable(HERO_ID, {
    onSelect: () => {
      // Measured live, so Enter mid-slide morphs from where the panel actually is.
      const panel = document.querySelector(`[data-hero-panel="${show.id}"]`)
      morph.hero = { showId: show.id, panel: stageRect(panel), title: stageRect(panel?.querySelector('h1') ?? null) }
      navigate(`/show/${show.id}`)
    },
    onKey: (key) => (key === 'ArrowLeft' ? step(-1) : key === 'ArrowRight' ? step(1) : false),
  })

  return (
    <div className="relative h-[672px]">
      {shows.map((s, i) => (
        <Panel
          key={s.id}
          show={s}
          index={i}
          stripX={stripX}
          current={i === current}
          focused={focused && i === current && !morphIn}
          morphIn={morphIn && i === current}
          onMorphDone={() => setMorphIn(false)}
        />
      ))}
      {/* The focusable is the hero rectangle itself; the panels slide under it. */}
      <div {...props} className="absolute top-0" style={{ left: HERO.left, width: HERO.w, height: HERO.h }} />
    </div>
  )
}

/** Focus ring on the centre panel: the same white 3px border as a focused tile, no lift (it is the size of the screen). */
const HERO_RING = '0 0 0 3px rgba(255,255,255,1)'
const NO_HERO_RING = '0 0 0 3px rgba(255,255,255,0)'

const OPAQUE = { hidden: { opacity: 1 }, shown: { opacity: 1 } }

function Panel({
  show,
  index,
  stripX,
  current,
  focused,
  morphIn,
  onMorphDone,
}: {
  show: Show
  index: number
  stripX: MotionValue<number>
  current: boolean
  focused: boolean
  morphIn: boolean
  onMorphDone: () => void
}) {
  const m = useMotion()

  // Where this panel is relative to the centre, in panels: 0 centred, ±1 a neighbour.
  const offset = useTransform(stripX, (v) => index + v / PITCH)
  const x = useTransform(stripX, (v) => index * PITCH + v)
  const near = useTransform(offset, (o) => Math.min(Math.abs(o), 1))
  const scale = useTransform(near, (n) => 1 - (1 - distance.heroNeighbourScale) * n)
  const opacity = useTransform(near, (n) => 1 - (1 - distance.heroNeighbourOpacity) * n)
  // Copy belongs to the centre panel: it fades as a panel slides out, so no stray letters in the peeks.
  const copyOpacity = useTransform(near, (n) => 1 - n)
  // Neighbours shrink toward the centre panel, so the gap between them and the edge peeks hold.
  const originX = useTransform(offset, (o) => (o > 0 ? 0 : o < 0 ? 1 : 0.5))

  // The title flies back from the show page's title.
  const title = useFlight<HTMLHeadingElement>(morphIn ? morph.showTitle : null, m.morph)

  // The logline waits for the title to land.
  const loglineOpacity = useMotionValue(morphIn ? 0 : 1)
  useEffect(() => {
    if (loglineOpacity.get() === 1) return
    const a = animate(loglineOpacity, 1, { ...m.fade, delay: m.reduced ? 0 : duration.copyAfterFlight })
    return () => a.stop()
    // Once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      data-hero-panel={show.id}
      data-hero-current={current || undefined}
      aria-hidden={!current || undefined}
      className="pointer-events-none absolute top-0"
      style={{ left: HERO.left, width: HERO.w, height: HERO.h, x, scale, originX, zIndex: morphIn ? 30 : current ? 1 : 0 }}
      variants={morphIn ? OPAQUE : m.part}
    >
      <motion.div className="absolute inset-0" style={{ opacity }}>
        {/* Full-bleed art clipped to the panel; the centre panel's covers the stage exactly when Home is unscrolled. */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ left: -HERO_RECT.x, top: -HERO_RECT.y, width: 1920, height: 1080 }}
          initial={{ clipPath: morphIn ? FULL_CLIP : HERO_CLIP }}
          animate={{ clipPath: HERO_CLIP }}
          transition={m.morph}
          onAnimationComplete={morphIn ? onMorphDone : undefined}
        >
          <img
            src={artUrl(show.heroArt)}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: show.artFocus }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        </motion.div>
        <motion.div className="absolute bottom-[150px] left-[83px] max-w-[640px]" style={{ opacity: copyOpacity }}>
          <motion.h1
            ref={title.ref}
            style={title.style}
            data-hero-title={show.id}
            className="display text-hero text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          >
            {show.title}
          </motion.h1>
          <motion.p
            style={{ opacity: loglineOpacity }}
            className="mt-[18px] text-[25px] font-light leading-[1.3] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
          >
            {show.logline}
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ boxShadow: focused ? HERO_RING : NO_HERO_RING }}
        transition={m.focus(focused)}
      />
    </motion.div>
  )
}
