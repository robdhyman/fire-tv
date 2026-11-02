import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useFocusable, useFocusedId } from '../focus/FocusEngine'
import { artUrl, type Show } from '../data/catalogue'

export const HERO = { w: 1686, h: 672, gap: 25, left: 117 }

export const heroId = (show: Show) => `hero:${show.id}`

/** Home's featured carousel: one panel per show, neighbours peeking in, dimmed. */
export function Hero({ shows, onCurrent }: { shows: Show[]; onCurrent?: (show: Show) => void }) {
  const focusedId = useFocusedId()
  const focusedIndex = shows.findIndex((s) => focusedId === heroId(s))
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (focusedIndex >= 0) setCurrent(focusedIndex)
  }, [focusedIndex])
  useEffect(() => {
    onCurrent?.(shows[current])
  }, [current, shows, onCurrent])

  return (
    <div className="relative h-[672px]">
      <div
        className="absolute top-0 flex"
        style={{
          left: HERO.left,
          gap: HERO.gap,
          transform: `translateX(${-current * (HERO.w + HERO.gap)}px)`,
          transition: 'transform 250ms ease-out',
        }}
      >
        {shows.map((show, i) => (
          <HeroPanel key={show.id} show={show} dim={i !== current} />
        ))}
      </div>
    </div>
  )
}

function HeroPanel({ show, dim }: { show: Show; dim: boolean }) {
  const navigate = useNavigate()
  const { props } = useFocusable(heroId(show), { onSelect: () => navigate(`/show/${show.id}`) })
  return (
    <div
      {...props}
      className={`relative shrink-0 overflow-hidden transition-opacity duration-300 ${dim ? 'opacity-40' : 'opacity-100'}`}
      style={{ width: HERO.w, height: HERO.h }}
    >
      <img
        src={artUrl(show.heroArt)}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: show.artFocus }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-[150px] left-[83px] max-w-[640px]">
        <h1 className="display text-hero text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{show.title}</h1>
        <p className="mt-[18px] text-[25px] font-light leading-[1.3] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          {show.logline}
        </p>
      </div>
    </div>
  )
}
