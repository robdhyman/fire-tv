import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useFocusable } from '../focus/FocusEngine'
import { artUrl, type Show } from '../data/catalogue'
import { useMotion } from '../motion/useMotion'
import { FOCUS_RING, NO_RING } from './Row'

export const GRID = { w: 320, h: 180, colPitch: 400, rowPitch: 249, cols: 4 }

/**
 * A show's key art in the Shows grid: art with the title set in the display
 * face. Focus springs it to 1.1 and lifts it in place; neighbours stay put.
 */
export function GridTile({ id, show }: { id: string; show: Show }) {
  const navigate = useNavigate()
  const m = useMotion()
  const { focused, props } = useFocusable(id, { onSelect: () => navigate(`/show/${show.id}`) })
  return (
    <motion.div variants={m.tile} className={focused ? 'relative z-10' : 'relative'}>
    <motion.div
      {...props}
      className="relative overflow-hidden"
      style={{ width: GRID.w, height: GRID.h }}
      initial={false}
      animate={{
        scale: focused ? m.focusScale : 1,
        y: focused ? m.focusLift : 0,
        boxShadow: focused ? FOCUS_RING : NO_RING,
      }}
      transition={m.focus(focused)}
    >
      <img
        src={artUrl(show.tileArt)}
        alt=""
        draggable={false}
        className="h-full w-full object-cover"
        style={{ objectPosition: show.artFocus }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="display absolute bottom-[14px] left-[16px] right-[16px] text-[34px] leading-[0.95] text-white drop-shadow-md">
        {show.title}
      </div>
    </motion.div>
    </motion.div>
  )
}
