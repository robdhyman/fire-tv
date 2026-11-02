import { useNavigate } from 'react-router'
import { useFocusable } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { Logo } from './Logo'

export type NavKey = 'shows' | 'watchlist' | 'tools' | 'search'

const ITEMS: { key: NavKey; path: string }[] = [
  { key: 'shows', path: '/shows' },
  { key: 'watchlist', path: '/watchlist' },
  { key: 'tools', path: '/tools' },
  { key: 'search', path: '/search' },
]

function NavItem({ item, active }: { item: (typeof ITEMS)[number]; active: boolean }) {
  const navigate = useNavigate()
  const { focused, props } = useFocusable(`nav:${item.key}`, { onSelect: () => navigate(item.path) })
  const big = active || focused
  return (
    <div
      {...props}
      className={`font-light leading-none transition-all duration-150 ${big ? 'text-[50px] text-white' : 'text-[38px] text-white/60'} ${
        focused ? 'underline decoration-accent decoration-[3px] underline-offset-[10px]' : ''
      }`}
    >
      {item.key}
    </div>
  )
}

/** Top bar: brand logo and the four destinations. `active` marks the current screen. */
export function Nav({ active }: { active?: NavKey }) {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const logo = useFocusable('nav:logo', { onSelect: () => navigate('/') })
  return (
    <header className="absolute left-[200px] top-[48px] z-20 flex h-[64px] items-baseline gap-[60px]">
      <div
        {...logo.props}
        className={`self-center transition-transform duration-150 ${logo.focused ? 'scale-110' : ''}`}
        style={{ marginRight: 4 }}
      >
        <Logo brand={settings.brand} />
      </div>
      {ITEMS.map((item) => (
        <NavItem key={item.key} item={item} active={active === item.key} />
      ))}
    </header>
  )
}
