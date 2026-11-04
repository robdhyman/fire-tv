import { useEffect, useState } from 'react'
import { duration } from '../motion/tokens'
import { RoundFace } from './RoundButton'

/*
 * The tile overlay (issue #30): what a dwell on an episode tile reveals.
 * The tile keeps focus while the overlay is up; Left/Right move a selection
 * between its three buttons (the tile's `onKey`), Enter runs the selected
 * one, and an arrow past either end leaves the tile as usual. The selection
 * starts on `play`, so a dwell never changes what Enter does.
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

/** `info`, `play`, `add` as round faces; `selected` is drawn as focused. */
export function OverlayButtons({ selected, added, className = '' }: { selected: number; added: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-[20px] ${className}`}>
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
  )
}
