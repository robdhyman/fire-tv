import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useFocusable } from '../focus/FocusEngine'
import { artUrl, type Show } from '../data/catalogue'
import { distance, duration } from '../motion/tokens'
import { FULL_CLIP, HERO_CLIP, morph, stageRect, useFlight, useMotion } from '../motion/useMotion'

export const HERO = { w: 1686, h: 672, gap: 25, left: 117 }

export const HERO_ID = 'hero'

/** The hero's current index per brand, so Back lands on the show it left from. */
const remembered = new Map<string, number>()

/**
 * Home's featured panel. One show at a time: Left/Right crossfade the art and
 * copy while the art drifts in a slow Ken Burns; the neighbours' edges peek
 * in at the screen edges, dimmed. Enter morphs the art and title into the
 * show page; returning from that show page plays the morph backwards.
 *
 * The art is the show page's full-bleed image clipped to the hero rectangle,
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

  // The title flies back from the show page's title.
  const title = useFlight<HTMLHeadingElement>(morphIn ? morph.showTitle : null, m.morph)

  // The logline waits for the title to land (a motion value: the copy's AnimatePresence blocks `initial`).
  const loglineOpacity = useMotionValue(morphIn ? 0 : 1)
  useEffect(() => {
    if (loglineOpacity.get() === 1) return
    const a = animate(loglineOpacity, 1, { ...m.fade, delay: m.reduced ? 0 : duration.copyAfterFlight })
    return () => a.stop()
    // Once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const kenBurns = useMotionValue(0)
  const kbScale = useTransform(kenBurns, (p) => 1 + distance.kenBurnsScale * p)
  const kbX = useTransform(kenBurns, (p) => distance.kenBurnsDrift * p)
  useEffect(() => {
    if (m.reduced) return
    kenBurns.set(0)
    const a = animate(kenBurns, 1, {
      duration: duration.kenBurns,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'mirror',
    })
    return () => a.stop()
  }, [show.id, kenBurns, m.reduced])

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
      // By id, not by ref: a fading-out title's unmount clears the shared ref.
      const h1 = document.querySelector(`[data-hero-title="${show.id}"]`)
      morph.hero = { showId: show.id, kenBurns: kenBurns.get(), title: stageRect(h1) }
      navigate(`/show/${show.id}`)
    },
    onKey: (key) => (key === 'ArrowLeft' ? step(-1) : key === 'ArrowRight' ? step(1) : false),
  })

  const prev = shows[current - 1]
  const next = shows[current + 1]

  return (
    <div className="relative h-[672px]">
      <motion.div variants={m.part}>
        <Peek show={prev} side="left" />
        <Peek show={next} side="right" />
      </motion.div>

      {/* Full-bleed art clipped to the hero; it covers the stage exactly when Home is unscrolled. */}
      <motion.div
        className="pointer-events-none absolute left-0 top-[-130px] h-[1080px] w-[1920px]"
        style={{ zIndex: morphIn ? 30 : 0 }}
        variants={morphIn ? { hidden: { opacity: 1 }, shown: { opacity: 1 } } : m.part}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: morphIn ? FULL_CLIP : HERO_CLIP }}
          animate={{ clipPath: HERO_CLIP }}
          transition={m.morph}
          onAnimationComplete={() => setMorphIn(false)}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={show.id}
              src={artUrl(show.heroArt)}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: show.artFocus, scale: kbScale, x: kbX }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={m.heroFade}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </motion.div>

      <motion.div {...props} className="absolute top-0 z-[31]" style={{ left: HERO.left, width: HERO.w, height: HERO.h }}
        variants={morphIn ? { hidden: { opacity: 1 }, shown: { opacity: 1 } } : m.part}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ boxShadow: focused ? HERO_RING : NO_HERO_RING }}
          transition={m.focus(focused)}
        />
        <AnimatePresence initial={false}>
          <motion.div
            key={show.id}
            className="absolute bottom-[150px] left-[83px] max-w-[640px]"
            initial={{ opacity: 0, y: m.reduced || morphIn ? 0 : distance.heroCopyRise }}
            animate={{ opacity: 1, y: 0, transition: { ...m.heroFade, delay: m.reduced ? 0 : duration.heroCopyDelay } }}
            exit={{ opacity: 0, transition: { duration: m.reduced ? duration.reduced : duration.heroCopyOut } }}
          >
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
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/** Focus ring on the hero: the same white 3px border as a focused tile, no lift (it is the size of the screen). */
const HERO_RING = '0 0 0 3px rgba(255,255,255,1)'
const NO_HERO_RING = '0 0 0 3px rgba(255,255,255,0)'

/** The edge of the previous or next show, dimmed, in the 92px gutter beside the hero. */
function Peek({ show, side }: { show?: Show; side: 'left' | 'right' }) {
  const m = useMotion()
  return (
    <div
      className="absolute top-0 h-[672px] w-[92px] overflow-hidden"
      style={{ [side]: 0 }}
    >
      <AnimatePresence initial={false}>
        {show && (
          <motion.img
            key={show.id}
            src={artUrl(show.heroArt)}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: side === 'left' ? 'right center' : 'left center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={m.heroFade}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
