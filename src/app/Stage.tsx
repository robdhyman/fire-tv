import { useEffect, useState, type ReactNode } from 'react'

export const STAGE_W = 1920
export const STAGE_H = 1080

/** A fixed 1920x1080 canvas scaled to fit the window and letterboxed in black. */
export function Stage({ children }: { children: ReactNode }) {
  const [fit, setFit] = useState({ scale: 1, x: 0, y: 0 })

  useEffect(() => {
    const measure = () => {
      const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)
      setFit({
        scale,
        x: (window.innerWidth - STAGE_W * scale) / 2,
        y: (window.innerHeight - STAGE_H * scale) / 2,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="stage" style={{ transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})` }}>
        {children}
      </div>
    </div>
  )
}
