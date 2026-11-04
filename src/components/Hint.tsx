import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useFocusContext } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { useMotion } from '../motion/useMotion'

/**
 * First-load hint: shown until the first arrow key, then remembered. Menu
 * (M) brings it back. The remote and sound lines show only where their
 * chips do (768px+).
 */
export function Hint({ shown, setShown }: { shown: boolean; setShown: (v: boolean) => void }) {
  const { settings, update } = useSettings()
  const { onFirstArrow } = useFocusContext()
  const m = useMotion()

  useEffect(
    () =>
      onFirstArrow(() => {
        setShown(false)
        update({ hintSeen: true })
      }),
    [onFirstArrow, update, setShown],
  )

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="pointer-events-none absolute bottom-[36px] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-[36px] py-[14px] text-[25px] font-light text-white/90 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={m.fade}
        >
          use the <b className="font-semibold text-accent">arrow keys</b> to move, <b className="font-semibold">enter</b> to
          select, <b className="font-semibold">esc</b> to go back
          <span className="hidden md:inline">
            , <b className="font-semibold text-accent">R</b> for an on-screen remote, <b className="font-semibold text-accent">S</b>{' '}
            {settings.navSounds ? 'to mute sounds' : 'for sounds'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
