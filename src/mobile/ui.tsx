import { type ComponentProps, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'
import { useSettings } from '../state/settings'
import { Logo } from '../components/Logo'
import type { RowItem } from '../components/Row'
import type { BadgeKind } from '../components/Badge'
import { artUrl, isMovie, type Movie, type Show } from '../data/catalogue'

/* Touch primitives shared by the mobile screens. Sizes are CSS px. */

/** A button with the tap-feedback spring (nothing with reduced motion). */
export function Pressable({ className = '', children, ...rest }: ComponentProps<typeof motion.button>) {
  const m = useMotion()
  return (
    <motion.button type="button" whileTap={m.press} transition={m.focus(true)} className={`block text-left ${className}`} {...rest}>
      {children}
    </motion.button>
  )
}

/** Pill button: `primary` is the accent-filled call to action. */
export function Pill({ primary, className = '', ...rest }: ComponentProps<typeof Pressable> & { primary?: boolean }) {
  return (
    <Pressable
      className={`flex h-[40px] items-center justify-center gap-[6px] rounded-full px-[18px] text-[14px] font-semibold leading-none ${
        primary ? 'bg-accent text-black' : 'bg-white/15 text-white'
      } ${className}`}
      {...rest}
    />
  )
}

/** Screen title in the 2017 nav's lowercase, with the brand mark at the right. */
export function ScreenHeader({ title, children }: { title: string; children?: ReactNode }) {
  const { settings } = useSettings()
  return (
    <header className="flex items-end justify-between px-gutter pb-[10px] pt-[calc(env(safe-area-inset-top)+16px)]">
      <h1 className="text-[30px] font-light lowercase leading-none">{title}</h1>
      <div className="flex items-center gap-3">
        {children}
        <SmallLogo brand={settings.brand} />
      </div>
    </header>
  )
}

export function SmallLogo({ brand }: { brand: 'syfy' | 'usa' }) {
  return (
    <span className="inline-block origin-right" style={{ transform: 'scale(0.72)' }}>
      <Logo brand={brand} />
    </span>
  )
}

/** Back: pop history, or go Home when there is none (the same rule as the TV's Back). */
export function useGoBack() {
  const navigate = useNavigate()
  return () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) navigate(-1)
    else navigate('/')
  }
}

export function BackButton({ className = '' }: { className?: string }) {
  const back = useGoBack()
  return (
    <Pressable
      aria-label="back"
      onClick={(e) => {
        e.stopPropagation()
        back()
      }}
      className={`flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black/50 text-white backdrop-blur ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 5-7 7 7 7" />
      </svg>
    </Pressable>
  )
}

/** Corner tag on a tile, at phone size. */
export function MiniBadge({ kind }: { kind: BadgeKind }) {
  return <span className="absolute right-0 top-0 bg-black/60 px-[7px] py-[4px] text-[10px] font-light leading-none text-white">{kind}</span>
}

/**
 * A row of tiles as a swipeable rail: horizontal scroll with snap, one tile
 * at the gutter, the next peeking in. Tiles are 16:9 and a fraction of the
 * viewport (two-thirds on a phone, under a third on a tablet); a `poster`
 * rail (Coming Soon) holds 2:3 movie posters at about a third and a seventh.
 */
export function MobileRow({ label, items, poster = false, className = '' }: { label: ReactNode; items: RowItem[]; poster?: boolean; className?: string }) {
  if (items.length === 0) return null
  return (
    <section className={className}>
      <h2 className="px-gutter text-[18px] font-light leading-none text-white/90">{label}</h2>
      <ul className="rail mt-[10px] flex snap-x snap-mandatory gap-[8px] overflow-x-auto px-gutter scroll-px-gutter">
        {items.map((item) => (
          <li key={item.id} className={`shrink-0 snap-start ${poster ? 'w-[36vw] md:w-[15vw]' : 'w-[64vw] md:w-[29vw]'}`}>
            <Pressable onClick={item.onSelect} className="w-full">
              <div className={`relative overflow-hidden rounded-[4px] bg-black/40 ${poster ? 'aspect-[2/3]' : 'aspect-video'}`}>
                <img src={item.art} alt="" draggable={false} className="h-full w-full object-cover" style={{ objectPosition: item.artFocus }} />
                {item.badge && <MiniBadge kind={item.badge} />}
                {item.overlay}
              </div>
              {item.label && <div className="mt-[6px] truncate text-[13px] leading-none text-white/90">{item.label}</div>}
            </Pressable>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * Key-art grid: two columns on a phone, three on a tablet, four from 1024px.
 * A movie keeps the 16:9 cell, as on TV: its poster whole on the left and
 * the title set beside it, with the `coming soon` badge.
 */
export function ShowGrid({ shows, className = '' }: { shows: (Show | Movie)[]; className?: string }) {
  const navigate = useNavigate()
  return (
    <ul className={`grid grid-cols-2 gap-[8px] px-gutter md:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {shows.map((entry) => (
        <li key={entry.id}>
          {isMovie(entry) ? (
            <Pressable onClick={() => navigate(`/movie/${entry.id}`)} className="relative flex aspect-video w-full overflow-hidden rounded-[4px] bg-rows">
              <img src={artUrl(entry.posterArt)} alt="" draggable={false} className="aspect-[2/3] h-full shrink-0 object-cover" />
              <MiniBadge kind="coming soon" />
              <div className="display flex min-w-0 flex-1 items-end px-[10px] pb-[8px] text-m-tile text-white">{entry.title}</div>
            </Pressable>
          ) : (
            <Pressable onClick={() => navigate(`/show/${entry.id}`)} className="relative aspect-video w-full overflow-hidden rounded-[4px]">
              <img src={artUrl(entry.tileArt)} alt="" draggable={false} className="h-full w-full object-cover" style={{ objectPosition: entry.artFocus }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="display absolute bottom-[8px] left-[10px] right-[10px] text-m-tile text-white drop-shadow-md">{entry.title}</div>
            </Pressable>
          )}
        </li>
      ))}
    </ul>
  )
}

/** Horizontal text tabs with the accent underline on the active one. */
export function TextTabs<K extends string>({ tabs, active, onChange, size = 'lg' }: { tabs: { key: K; label: string }[]; active: K; onChange: (k: K) => void; size?: 'lg' | 'md' }) {
  return (
    <div className="rail flex gap-[22px] overflow-x-auto px-gutter">
      {tabs.map((t) => (
        <Pressable
          key={t.key}
          onClick={() => onChange(t.key)}
          aria-pressed={t.key === active}
          className={`shrink-0 whitespace-nowrap border-b-[3px] pb-[8px] leading-none transition-colors duration-(--motion-quick) ${
            size === 'lg' ? 'text-[20px]' : 'text-[16px]'
          } ${t.key === active ? 'border-accent text-white' : 'border-transparent text-white/60'}`}
        >
          {t.label}
        </Pressable>
      ))}
    </div>
  )
}
