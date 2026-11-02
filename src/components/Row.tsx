import { useEffect, useState, type ReactNode } from 'react'
import { useFocusable, useFocusedId } from '../focus/FocusEngine'
import { Badge } from './Badge'

/*
 * A row of tiles with a label. Two modes, both from the screenshots:
 *  plain  318x179 tiles, 2px gap, no labels
 *  big    376x211 tiles with labels below, 19px gap; the current tile 590x332
 *         with its label inside; a white border when it is actually focused.
 * The row is a carousel anchored at x=200: the current tile sits at the safe
 * inset and the previous one peeks in from the left edge.
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
}

export const rowTileId = (rowId: string, itemId: string) => `${rowId}:${itemId}`

export function Row({ id, label, items, mode = 'auto', initialIndex = 0, aside, className = '' }: Props) {
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
          className={`font-light leading-none transition-all duration-150 ${
            within ? 'text-[36px] text-white' : 'text-[30px] text-white/80'
          }`}
        >
          {label}
        </h2>
        {aside}
      </div>
      <div
        className={`mt-[6px] flex items-center transition-[height] duration-200 ${big ? 'h-[332px]' : 'h-[179px]'}`}
        style={{ gap: big ? BIG.gap : PLAIN.gap, transform: `translateX(${-anchor * pitch}px)`, transition: 'transform 200ms ease-out' }}
      >
        {items.map((item, i) => (
          <Tile key={item.id} rowId={id} item={item} big={big} current={big && i === anchor} />
        ))}
      </div>
    </section>
  )
}

function Tile({ rowId, item, big, current }: { rowId: string; item: RowItem; big: boolean; current: boolean }) {
  const { focused, props } = useFocusable(rowTileId(rowId, item.id), { onSelect: item.onSelect })
  const w = current ? BIG.focusW : big ? BIG.w : PLAIN.w
  const h = current ? BIG.focusH : big ? BIG.h : PLAIN.h
  return (
    <div className="relative flex shrink-0 flex-col justify-center" style={{ width: w, height: big ? BIG.focusH : PLAIN.h }}>
      <div
        {...props}
        className={`relative overflow-hidden bg-black/40 transition-all duration-200 ${
          focused ? 'shadow-[0_0_0_3px_#fff]' : ''
        }`}
        style={{ width: w, height: h }}
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
      </div>
      {big && !current && item.label && (
        <div className="absolute bottom-[12px] left-0 right-0 truncate text-[25px] leading-none text-white">{item.label}</div>
      )}
    </div>
  )
}

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
