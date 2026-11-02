import type { ReactNode } from 'react'
import { useFocusable } from '../focus/FocusEngine'

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
      <span
        className={`flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] text-[34px] font-light leading-none transition-all duration-150 ${
          filled ? 'border-white bg-[#3aa551]' : 'border-white/90'
        } ${focused ? 'scale-110 bg-white text-black' : 'text-white'}`}
      >
        {children}
      </span>
      {label && focused && <span className="text-[25px] font-light text-white">{label}</span>}
    </div>
  )
}
