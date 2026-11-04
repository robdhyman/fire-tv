import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useFocusable } from '../focus/FocusEngine'
import { useMotion } from '../motion/useMotion'

/** The 60px circular control (+, i, play) from the hero and the expanded tile. */
export function RoundButton({
  id,
  onSelect,
  children,
  filled,
  label,
}: {
  id: string
  onSelect: () => void
  children: ReactNode
  filled?: boolean
  label?: string
}) {
  const { focused, props } = useFocusable(id, { onSelect })
  return (
    <div {...props} className="flex items-center gap-[16px]" title={label}>
      <RoundFace focused={focused} filled={filled}>
        {children}
      </RoundFace>
      {label && focused && <span className="text-[25px] font-light text-white">{label}</span>}
    </div>
  )
}

/** The round button's face alone, for controls that are not focusables of their own (the tile overlay's buttons). */
export function RoundFace({ focused, filled, children }: { focused: boolean; filled?: boolean; children: ReactNode }) {
  const m = useMotion()
  return (
    <motion.span
      className={`flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] text-[34px] font-light leading-none transition-colors duration-(--motion-quick) ${
        focused ? 'border-white bg-white text-black' : filled ? 'border-white bg-[#3aa551] text-white' : 'border-white/90 text-white'
      }`}
      initial={false}
      animate={{ scale: focused ? m.focusScale : 1 }}
      transition={m.focus(focused)}
    >
      {children}
    </motion.span>
  )
}
