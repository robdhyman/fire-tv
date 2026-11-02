import { useEffect, type ReactNode } from 'react'
import { motion, useMotionValue } from 'motion/react'

export const STAGE_W = 1920
export const STAGE_H = 1080

/**
 * A fixed 1920x1080 canvas scaled to fit the window and letterboxed in black.
 * The fit is held in motion values so shared-element morphs inside the stage
 * can undo the scale when they measure.
 */
export function Stage({ children }: { children: ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)

  useEffect(() => {
    const measure = () => {
      const s = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)
      scale.set(s)
      x.set((window.innerWidth - STAGE_W * s) / 2)
      y.set((window.innerHeight - STAGE_H * s) / 2)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [x, y, scale])

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <motion.div className="stage" style={{ x, y, scale, originX: 0, originY: 0 }}>
        {children}
      </motion.div>
    </div>
  )
}
