import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useFocusable, useFocusedId } from '../focus/FocusEngine'
import { useMotion } from '../motion/useMotion'
import { Badge } from './Badge'

/*
 * A row of tiles with a label. Two modes, both from the screenshots:
 *  plain  318x179 tiles, 2px gap, no labels
 *  big    376x211 tiles with labels below, 19px gap; the current tile 590x332
 *         with its label inside; a white border when it is actually focused.
 * The row is a carousel anchored at x=200: the current tile sits at the safe
 * inset and the previous one peeks in from the left edge. Strip, widths and
 * height move on the `strip` spring; the focused tile lifts on `focus`;
 * tiles settle in with a stagger when the screen enters.
 */

export const PLAIN = { w: 318, h: 179, gap: 2 }
export const BIG = { w: 376, h: 211, gap: 19, focusW: 590, focusH: 332 }
export const ROW_LABEL_H = 33
/** Row block heights (label + gap + tiles) in each mode. */
export const ROW_H_PLAIN = ROW_LABEL_H + PLAIN.h
export const ROW_H_BIG = ROW_LABEL_H + 6 + BIG.focusH

export type RowItem = {
  id: string
  art: string
  artFocus?: string
  label?: ReactNode
  badge?: 'new' | 'expiring'
  onSelect: () => void
  /** Extra content drawn over the tile (the Player's countdown ring). */
  overlay?: ReactNode
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
}

export const rowTileId = (rowId: string, itemId: string) => `${rowId}:${itemId}`

export function Row({ id, label, items, mode = 'auto', initialIndex = 0, aside, className = '', enterDelay = 0 }: Props) {
  const m = useMotion()
  const focusedId = useFocusedId()
  const focusedIndex = items.findIndex((it) => focusedId === rowTileId(id, it.id))
  const [current, setCurrent] = useState(initialIndex)
  useEffect(() => {
    if (focusedIndex >= 0) setCurrent(focusedIndex)
  }, [focusedIndex])

  const within = focusedIndex >= 0
  const big = mode === 'big' || (mode === 'auto' && within)
  const pitch = big ? BIG.w + BIG.gap : PLAIN.w + PLAIN.gap
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
        className="mt-[6px] flex items-center"
        initial={false}
        animate={{ height: big ? BIG.focusH : PLAIN.h, x: -anchor * pitch }}
        transition={m.strip}
      >
        <motion.div
          className="flex items-center"
          style={{ gap: big ? BIG.gap : PLAIN.gap }}
          variants={m.stagger(enterDelay)}
          initial="hidden"
          animate="shown"
        >
          {items.map((item, i) => (
            <Tile key={item.id} rowId={id} item={item} big={big} current={big && i === anchor} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function Tile({ rowId, item, big, current }: { rowId: string; item: RowItem; big: boolean; current: boolean }) {
  const m = useMotion()
  const { focused, props } = useFocusable(rowTileId(rowId, item.id), { onSelect: item.onSelect })
  const w = current ? BIG.focusW : big ? BIG.w : PLAIN.w
  const h = current ? BIG.focusH : big ? BIG.h : PLAIN.h
  return (
    <motion.div variants={m.tile} className="shrink-0">
      <motion.div
        className="relative flex flex-col justify-center"
        initial={false}
        animate={{ width: w, height: big ? BIG.focusH : PLAIN.h }}
        transition={m.strip}
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
          {item.badge && <Badge kind={item.badge} />}
          {item.overlay}
          {current && item.label && (
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

/** Focus ring: a white 3px border and a drop shadow under the lifted tile. Both ends share one shape so it tweens. */
export const FOCUS_RING = '0 0 0 3px rgba(255,255,255,1), 0 18px 36px rgba(0,0,0,0.55)'
export const NO_RING = '0 0 0 3px rgba(255,255,255,0), 0 0px 0px rgba(0,0,0,0)'

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
