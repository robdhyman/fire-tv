import { useRef, type ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import { morph, useMotion } from '../motion/useMotion'

/** Home and the show page run their own enter/exit (the shared-element morph); the rest crossfade whole. */
const ownsMotion = (path: string) => path === '/' || path.startsWith('/show/')

/**
 * Route switcher. The leaving screen stays mounted while it animates out,
 * underneath the arriving one; neither blocks input. Children with
 * `hidden` / `shown` variants follow the screen's enter and exit.
 */
export function Screens() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const last = useRef<string | null>(null)
  if (last.current !== pathname) {
    morph.prevPath = last.current
    last.current = pathname
  }
  return (
    <AnimatePresence>
      <Screen key={pathname} fade={!ownsMotion(pathname)}>
        {outlet}
      </Screen>
    </AnimatePresence>
  )
}

function Screen({ fade, children }: { fade: boolean; children: ReactNode }) {
  const present = useIsPresent()
  const m = useMotion()
  return (
    <motion.div
      className="absolute inset-0"
      data-exiting={present ? undefined : ''}
      style={{ zIndex: present ? 1 : 0, pointerEvents: present ? undefined : 'none' }}
      variants={fade ? m.part : { hidden: {}, shown: {} }}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      {children}
    </motion.div>
  )
}
