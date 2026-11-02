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
  const m = useMotion()
  const { focused, props } = useFocusable(id, { onSelect })
  return (
    <div {...props} className="flex items-center gap-[16px]" title={label}>
      <motion.span
        className={`flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] text-[34px] font-light leading-none transition-colors duration-(--motion-quick) ${
          filled ? 'border-white bg-[#3aa551]' : 'border-white/90'
        } ${focused ? 'bg-white text-black' : 'text-white'}`}
        initial={false}
        animate={{ scale: focused ? m.focusScale : 1 }}
        transition={m.focus(focused)}
      >
        {children}
      </motion.span>
      {label && focused && <span className="text-[25px] font-light text-white">{label}</span>}
    </div>
  )
}
