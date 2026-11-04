import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useFocusable, useFocusedId } from '../focus/FocusEngine'
import { useMotion } from '../motion/useMotion'
import { distance } from '../motion/tokens'
import { useSettings } from '../state/settings'
import type { EpisodeRef } from '../data/catalogue'
import { Badge, type BadgeKind } from './Badge'
import { OVERLAY_BUTTONS, OVERLAY_START, ProgressStroke, TileOverlay, useDwell, type OverlayButton } from './TileOverlay'

/*
 * A row of tiles with a label. Two modes, both from the screenshots:
 *  plain  318x179 tiles, 2px gap, no labels
 *  big    376x211 tiles with labels below, 19px gap; the current tile 590x332
 *         with its label inside; a white border when it is actually focused.
 *         The label sits LIFT_ROOM further above the tiles than in plain mode,
 *         so the focused tile's lift and ring never cross it (issue #27).
 * The row is a carousel anchored at x=200: the current tile sits at the safe
 * inset and the previous one peeks in from the left edge. Strip, widths and
 * height move on the `strip` spring; the focused tile lifts on `focus`;
 * tiles settle in with a stagger when the screen enters.
 * A poster row (Coming Soon) holds 2:3 movie posters instead: 160x240 at
 * rest in either mode and 221x332 when current, shown as is with no label
 * over the art, since a poster carries its title in the image.
 * Episode tiles (`episode` set) draw the progress stroke, and a dwell on one
 * reveals the tile overlay (issue #30, `TileOverlay.tsx`); posters get neither.
 */

export const PLAIN = { w: 318, h: 179, gap: 2 }
export const BIG = { w: 376, h: 211, gap: 19, focusW: 590, focusH: 332 }
/** 2:3 movie posters: one size at rest, the open row's tile height when current. */
export const POSTER = { w: 160, h: 240, focusW: 221, focusH: BIG.focusH }
export const ROW_LABEL_H = 33
/** Focus ring width, px: the white border in FOCUS_RING. */
const RING_W = 3
/** Room a big row keeps between label and tiles for the lift and the ring: the lifted ring lands where the resting tile sat. */
export const LIFT_ROOM = -distance.focusLift + RING_W
/** Row block heights (label + gap + tiles) in each mode. */
export const ROW_H_PLAIN = ROW_LABEL_H + PLAIN.h
export const ROW_H_BIG = ROW_LABEL_H + 6 + LIFT_ROOM + BIG.focusH

export type RowItem = {
  id: string
  art: string
  artFocus?: string
  label?: ReactNode
  badge?: BadgeKind
  onSelect: () => void
  /** Extra content drawn over the tile (the Player's countdown ring). A tile with one gets no tile overlay. */
  overlay?: ReactNode
  /** An episode tile: draws the progress stroke, and a dwell reveals the tile overlay. */
  episode?: EpisodeRef
  /** The overlay's `info`; opens the show page when absent. */
  onInfo?: () => void
}

type Props = {
  id: string
  label: ReactNode
  items: RowItem[]
  /** `auto` is plain until a tile in the row is focused. */
  mode?: 'auto' | 'big' | 'plain'
  /** Index to anchor before any tile in the row was focused. */
  initialIndex?: number
  aside?: ReactNode
  className?: string
  /** Seconds to wait before the tiles stagger in (later rows wait longer). */
  enterDelay?: number
  /** 2:3 movie posters (Coming Soon) instead of 16:9 stills and key art. */
  poster?: boolean
}

export const rowTileId = (rowId: string, itemId: string) => `${rowId}:${itemId}`

/** A tile's size: plain, big, or the big row's current tile. */
function tileSize(poster: boolean, big: boolean, current: boolean) {
  if (poster) return current ? { w: POSTER.focusW, h: POSTER.focusH } : { w: POSTER.w, h: POSTER.h }
  if (current) return { w: BIG.focusW, h: BIG.focusH }
  return big ? { w: BIG.w, h: BIG.h } : { w: PLAIN.w, h: PLAIN.h }
}

export function Row({ id, label, items, mode = 'auto', initialIndex = 0, aside, className = '', enterDelay = 0, poster = false }: Props) {
  const m = useMotion()
  const focusedId = useFocusedId()
  const focusedIndex = items.findIndex((it) => focusedId === rowTileId(id, it.id))
  const [current, setCurrent] = useState(initialIndex)
  useEffect(() => {
    if (focusedIndex >= 0) setCurrent(focusedIndex)
  }, [focusedIndex])

  const within = focusedIndex >= 0
  const big = mode === 'big' || (mode === 'auto' && within)
  const pitch = tileSize(poster, big, false).w + (big ? BIG.gap : PLAIN.gap)
  const stripH = big ? BIG.focusH : poster ? POSTER.h : PLAIN.h
  const anchor = Math.min(current, items.length - 1)

  return (
    <section className={`relative ${className}`}>
      <div className="flex h-[33px] w-[1520px] items-end justify-between">
        <h2
          className={`font-light leading-none transition-all duration-(--motion-quick) ${
            within ? 'text-[36px] text-white' : 'text-[30px] text-white/80'
          }`}
        >
          {label}
        </h2>
        {aside}
      </div>
      <motion.div
        className="flex items-center"
        initial={false}
        animate={{ marginTop: big ? 6 + LIFT_ROOM : 6, height: stripH, x: -anchor * pitch }}
        transition={{ default: m.strip, marginTop: m.scroll, height: m.scroll }}
      >
        <motion.div
          className="flex items-center"
          style={{ gap: big ? BIG.gap : PLAIN.gap }}
          variants={m.stagger(enterDelay)}
          initial="hidden"
          animate="shown"
        >
          {items.map((item, i) => (
            <Tile key={item.id} rowId={id} item={item} big={big} current={big && i === anchor} poster={poster} stripH={stripH} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

type TileProps = { rowId: string; item: RowItem; big: boolean; current: boolean; poster: boolean; stripH: number }

function Tile({ rowId, item, big, current, poster, stripH }: TileProps) {
  const m = useMotion()
  const navigate = useNavigate()
  const { inWatchlist, toggleWatchlist } = useSettings()
  const id = rowTileId(rowId, item.id)
  const focusedId = useFocusedId()
  const ep = item.episode
  // A dwell on an episode tile reveals the tile overlay; a tile already carrying an overlay (the countdown ring) keeps it.
  const dwelling = useDwell(focusedId === id && !!ep && !item.overlay)
  // The overlay's selected button: a ref as well, so presses faster than a render still step one at a time.
  const [selected, setSelectedState] = useState(OVERLAY_START)
  const selectedRef = useRef(OVERLAY_START)
  const setSelected = (i: number) => {
    selectedRef.current = i
    setSelectedState(i)
  }
  useEffect(() => {
    if (!dwelling) setSelected(OVERLAY_START)
  }, [dwelling])

  const run = (button: OverlayButton) => {
    if (!ep) return
    if (button === 'play') item.onSelect()
    else if (button === 'info') (item.onInfo ?? (() => navigate(`/show/${ep.show.id}`)))()
    else toggleWatchlist(ep.show.id)
  }
  const { focused, props } = useFocusable(id, {
    onSelect: dwelling ? () => run(OVERLAY_BUTTONS[selectedRef.current]) : item.onSelect,
    // Left/Right step through info, play, add; past either end the arrow leaves the tile as usual.
    onKey: (key) => {
      if (!dwelling) return false
      const step = key === 'ArrowLeft' ? -1 : key === 'ArrowRight' ? 1 : 0
      const to = selectedRef.current + step
      if (!step || to < 0 || to >= OVERLAY_BUTTONS.length) return false
      setSelected(to)
      return true
    },
  })
  const { w, h } = tileSize(poster, big, current)
  return (
    <motion.div variants={m.tile} className="shrink-0">
      <motion.div
        className="relative flex flex-col justify-center"
        initial={false}
        animate={{ width: w, height: stripH }}
        transition={{ default: m.strip, height: m.scroll }}
      >
        <motion.div
          {...props}
          className="relative overflow-hidden bg-black/40"
          initial={false}
          animate={{ width: w, height: h, y: focused ? m.focusLift : 0, boxShadow: focused ? FOCUS_RING : NO_RING }}
          transition={{ default: m.strip, y: m.focus(focused), boxShadow: m.focus(focused) }}
        >
          <img
            src={item.art}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
            style={{ objectPosition: item.artFocus }}
          />
          {dwelling && ep && (
            <TileOverlay
              episode={ep}
              label={<EpisodeLabel season={ep.season.number} number={ep.episode.number} title={ep.episode.title} />}
              selected={selected}
              added={inWatchlist(ep.show.id)}
            />
          )}
          {ep && <ProgressStroke progress={ep.progress} />}
          {item.badge && <Badge kind={item.badge} />}
          {item.overlay}
          {current && item.label && !dwelling && (
            <div className="absolute bottom-[14px] left-[20px] right-[20px] truncate text-[25px] leading-none text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
              {item.label}
            </div>
          )}
        </motion.div>
        {big && !current && item.label && (
          <div className="absolute bottom-[12px] left-0 right-0 truncate text-[25px] leading-none text-white">{item.label}</div>
        )}
      </motion.div>
    </motion.div>
  )
}

/** Focus ring: a white RING_W border and a drop shadow under the lifted tile. Both ends share one shape so it tweens. */
export const FOCUS_RING = `0 0 0 ${RING_W}px rgba(255,255,255,1), 0 18px 36px rgba(0,0,0,0.55)`
export const NO_RING = `0 0 0 ${RING_W}px rgba(255,255,255,0), 0 0px 0px rgba(0,0,0,0)`

/** `E2 Heros and Morons` with the number in the label weight. */
export function EpisodeLabel({ season, number, title }: { season?: number; number: number; title: string }) {
  return (
    <>
      <span className="font-semibold">
        {season !== undefined ? `S${season} ` : ''}E{number}
      </span>
      <span className="ml-[10px] font-normal">{title}</span>
    </>
  )
}
