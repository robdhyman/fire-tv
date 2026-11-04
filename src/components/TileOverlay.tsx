import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { duration } from '../motion/tokens'
import { useMotion } from '../motion/useMotion'
import type { EpisodeRef } from '../data/catalogue'
import { RoundFace } from './RoundButton'

/*
 * The tile overlay (issue #30): what a dwell on an episode tile reveals.
 * The tile keeps focus while the overlay is up; Left/Right move a selection
 * between its three buttons (the tile's `onKey`), Enter runs the selected
 * one, and an arrow past either end leaves the tile as usual. The selection
 * starts on `play`, so a dwell never changes what Enter does.
 *
 * Rob's picks from the prototype (4 Nov, branch `prototype/dwell-overlay`):
 * one stack on the 24 px inset (show, episode, buttons, synopsis), the still
 * darkened to black 55%, the synopsis capped at three lines, a 1.2 s dwell.
 * Focus always opens a tile to 590x332, so the overlay is only ever drawn there.
 */

export const OVERLAY_BUTTONS = ['info', 'play', 'add'] as const
export type OverlayButton = (typeof OVERLAY_BUTTONS)[number]
export const OVERLAY_START = OVERLAY_BUTTONS.indexOf('play')

/** True once `active` has held for the dwell; false the moment it drops. */
export function useDwell(active: boolean, seconds: number = duration.dwell) {
  const [dwelt, setDwelt] = useState(false)
  useEffect(() => {
    setDwelt(false)
    if (!active) return
    const timer = window.setTimeout(() => setDwelt(true), seconds * 1000)
    return () => window.clearTimeout(timer)
  }, [active, seconds])
  return active && dwelt
}

/** The 2px watch-position line along an episode tile's bottom edge; absent at zero. */
export function ProgressStroke({ progress }: { progress: number }) {
  if (progress <= 0) return null
  return <div className="absolute bottom-0 left-0 h-[2px] bg-white" style={{ width: `${Math.min(1, progress) * 100}%` }} />
}

/** The overlay over a 590x332 tile: show name, episode label, the three buttons and the synopsis. */
export function TileOverlay({ episode, label, selected, added }: { episode: EpisodeRef; label: ReactNode; selected: number; added: boolean }) {
  const m = useMotion()
  return (
    <motion.div className="absolute inset-0 bg-black/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={m.overlay}>
      <div className="absolute inset-0 flex flex-col items-start p-[24px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
        <div className="text-[23px] font-light uppercase leading-none tracking-[0.04em] text-white/85">{episode.show.title}</div>
        <div className="mt-[8px] max-w-full truncate text-[25px] leading-[1.1] text-white">{label}</div>
        <div className="mt-[22px] flex items-center gap-[20px] pl-[3px]">
          <RoundFace focused={selected === 0}>
            <span className="font-serif text-[32px] italic leading-none">i</span>
          </RoundFace>
          <RoundFace focused={selected === 1} filled>
            <svg width="22" height="26" viewBox="0 0 22 26" className="ml-[4px]" fill="currentColor">
              <path d="M0 0 22 13 0 26z" />
            </svg>
          </RoundFace>
          <RoundFace focused={selected === 2}>{added ? '✓' : '+'}</RoundFace>
        </div>
        <p className="mt-[20px] line-clamp-3 max-w-[540px] text-[23px] font-light leading-[1.3] text-white">{episode.episode.synopsis}</p>
      </div>
    </motion.div>
  )
}
