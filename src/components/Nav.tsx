import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'
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
  // Size marks the current screen only; focus is colour and underline, so the bar never reflows.
  return (
    <div
      {...props}
      className={`font-light leading-none transition-colors duration-(--motion-quick) ${active ? 'text-[50px]' : 'text-[38px]'} ${
        active || focused ? 'text-white' : 'text-white/60'
      } ${
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
  const m = useMotion()
  const logo = useFocusable('nav:logo', { onSelect: () => navigate('/') })
  return (
    <motion.header
      className="absolute left-[200px] top-[48px] z-20 flex h-[64px] items-baseline gap-[60px]"
      variants={m.part}
    >
      <motion.div
        {...logo.props}
        className="self-center"
        style={{ marginRight: 4 }}
        initial={false}
        animate={{ scale: logo.focused ? m.focusScale : 1 }}
        transition={m.focus(logo.focused)}
      >
        <Logo brand={settings.brand} />
      </motion.div>
      {ITEMS.map((item) => (
        <NavItem key={item.key} item={item} active={active === item.key} />
      ))}
    </motion.header>
  )
}
