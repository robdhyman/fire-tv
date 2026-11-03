import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/*
 * Device class (issue #13): which of the three layouts the window gets.
 *   phone   below 768px            touch, bottom tab bar, scrolling document
 *   tablet  768px to 1279px        the phone layout with wider tiles and more columns
 *   tv      1280px and up          the keyboard-only 1920x1080 stage (ADR 001)
 * The two cuts are Tailwind's `md` and `xl`, so the mobile screens use those
 * prefixes for tablet and nothing else. A touch-only window wider than 1279px
 * (an iPad Pro in landscape) gets the tablet layout: the stage ignores touch.
 * `?device=phone|tablet|tv` on load forces a class for screenshots.
 */

export const BREAKPOINT = { tablet: 768, tv: 1280 } as const
export type DeviceClass = 'phone' | 'tablet' | 'tv'

const TOUCH_ONLY = '(pointer: coarse) and (hover: none)'

export function classify(width: number, touchOnly: boolean): DeviceClass {
  if (width >= BREAKPOINT.tv && !touchOnly) return 'tv'
  return width >= BREAKPOINT.tablet ? 'tablet' : 'phone'
}

const override = new URLSearchParams(window.location.search).get('device')

function current(): DeviceClass {
  if (override === 'phone' || override === 'tablet' || override === 'tv') return override
  return classify(window.innerWidth, window.matchMedia(TOUCH_ONLY).matches)
}

const DeviceContext = createContext<DeviceClass>('tv')

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<DeviceClass>(current)
  useEffect(() => {
    const update = () => setDevice(current())
    const mq = window.matchMedia(TOUCH_ONLY)
    window.addEventListener('resize', update)
    mq.addEventListener('change', update)
    return () => {
      window.removeEventListener('resize', update)
      mq.removeEventListener('change', update)
    }
  }, [])
  return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
}

export const useDevice = () => useContext(DeviceContext)

/** One route, two screens: the TV stage's or the mobile layout's. */
export function Adaptive({ tv, mobile }: { tv: ReactNode; mobile: ReactNode }) {
  return <>{useDevice() === 'tv' ? tv : mobile}</>
}
