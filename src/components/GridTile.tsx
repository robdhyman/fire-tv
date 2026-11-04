import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useFocusable } from '../focus/FocusEngine'
import { artUrl, isMovie, type Movie, type Show } from '../data/catalogue'
import { useMotion } from '../motion/useMotion'
import { Badge } from './Badge'
import { FOCUS_RING, NO_RING } from './Row'

export const GRID = { w: 320, h: 180, colPitch: 400, rowPitch: 249, cols: 4 }
/** A movie's poster in a grid cell: 2:3 at the cell's height, flush left. */
const GRID_POSTER_W = 120

/**
 * A show's key art in the Shows grid: art with the title set in the display
 * face. A movie keeps the same cell: its poster as is on the left, the title
 * set beside it (never over the poster) and the `coming soon` badge.
 * Focus springs it to 1.1 and lifts it in place; neighbours stay put.
 */
export function GridTile({ id, entry }: { id: string; entry: Show | Movie }) {
  const navigate = useNavigate()
  const m = useMotion()
  const movie = isMovie(entry)
  const { focused, props } = useFocusable(id, { onSelect: () => navigate(movie ? `/movie/${entry.id}` : `/show/${entry.id}`) })
  return (
    <motion.div variants={m.tile} className={focused ? 'relative z-10' : 'relative'}>
    <motion.div
      {...props}
      className={`relative overflow-hidden ${movie ? 'bg-rows' : ''}`}
      style={{ width: GRID.w, height: GRID.h }}
      initial={false}
      animate={{
        scale: focused ? m.focusScale : 1,
        y: focused ? m.focusLift : 0,
        boxShadow: focused ? FOCUS_RING : NO_RING,
      }}
      transition={m.focus(focused)}
    >
      {movie ? (
        <>
          <img
            src={artUrl(entry.posterArt)}
            alt=""
            draggable={false}
            className="absolute inset-y-0 left-0 h-full object-cover"
            style={{ width: GRID_POSTER_W }}
          />
          <Badge kind="coming soon" />
          <div
            className="display absolute bottom-[14px] right-[16px] text-[34px] leading-[0.95] text-white"
            style={{ left: GRID_POSTER_W + 16 }}
          >
            {entry.title}
          </div>
        </>
      ) : (
        <>
          <img
            src={artUrl(entry.tileArt)}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
            style={{ objectPosition: entry.artFocus }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="display absolute bottom-[14px] left-[16px] right-[16px] text-[34px] leading-[0.95] text-white drop-shadow-md">
            {entry.title}
          </div>
        </>
      )}
    </motion.div>
    </motion.div>
  )
}
