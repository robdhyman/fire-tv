import { useEffect, useState } from 'react'
import { useFocusContext } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'

/** First-load hint: shown until the first arrow key, then remembered. */
export function Hint() {
  const { settings, update } = useSettings()
  const { onFirstArrow } = useFocusContext()
  const [shown, setShown] = useState(!settings.hintSeen)

  useEffect(
    () =>
      onFirstArrow(() => {
        setShown(false)
        update({ hintSeen: true })
      }),
    [onFirstArrow, update],
  )

  if (!shown) return null
  return (
    <div className="pointer-events-none absolute bottom-[36px] left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/75 px-[36px] py-[14px] text-[25px] font-light text-white/90 shadow-lg">
      use the <b className="font-semibold text-accent">arrow keys</b> to move, <b className="font-semibold">enter</b> to
      select, <b className="font-semibold">esc</b> to go back
    </div>
  )
}
