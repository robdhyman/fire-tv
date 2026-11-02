import { useNavigate } from 'react-router'
import { useFocusable } from '../focus/FocusEngine'
import { artUrl, type Show } from '../data/catalogue'

export const GRID = { w: 320, h: 180, colPitch: 400, rowPitch: 249, cols: 4 }

/** A show's key art in the Shows grid: art with the title set in the display face. */
export function GridTile({ id, show }: { id: string; show: Show }) {
  const navigate = useNavigate()
  const { focused, props } = useFocusable(id, { onSelect: () => navigate(`/show/${show.id}`) })
  return (
    <div
      {...props}
      className={`relative overflow-hidden transition-transform duration-150 ${
        focused ? 'z-10 scale-110 shadow-[0_0_0_3px_#fff,0_20px_40px_rgba(0,0,0,0.6)]' : ''
      }`}
      style={{ width: GRID.w, height: GRID.h }}
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
    </div>
  )
}
