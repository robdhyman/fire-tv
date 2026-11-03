import { Link, ScrollRestoration, useLocation, useOutlet } from 'react-router'
import { motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'

/*
 * The phone and tablet layout (issue #13): a normal scrolling document driven
 * by touch, with a bottom tab bar in place of the TV's top nav. No focus
 * engine, no on-screen remote, no arrow-key hint. Screens fade in on
 * arrival; the Player takes the whole viewport and hides the tab bar.
 */

export function MobileApp() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const m = useMotion()
  const playing = pathname.startsWith('/play/')
  return (
    <div className={`mobile min-h-dvh bg-page text-white ${playing ? '' : 'pb-[calc(var(--spacing-tab-bar)+env(safe-area-inset-bottom))]'}`}>
      <ScrollRestoration />
      <motion.div key={pathname} initial="hidden" animate="shown" variants={m.part}>
        {outlet}
      </motion.div>
      {!playing && <TabBar />}
    </div>
  )
}

type Tab = { key: string; label: string; path: string; icon: (active: boolean) => React.ReactNode }

const ICON = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const TABS: Tab[] = [
  { key: 'home', label: 'home', path: '/', icon: (a) => (<svg {...ICON}><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" fill={a ? 'currentColor' : 'none'} fillOpacity={a ? 0.25 : 0} /></svg>) },
  { key: 'shows', label: 'shows', path: '/shows', icon: (a) => (<svg {...ICON}><rect x="3" y="4" width="18" height="14" rx="2" fill={a ? 'currentColor' : 'none'} fillOpacity={a ? 0.25 : 0} /><path d="M8 21h8" /></svg>) },
  { key: 'watchlist', label: 'watchlist', path: '/watchlist', icon: (a) => (<svg {...ICON}><path d="M6 3h12v18l-6-4-6 4z" fill={a ? 'currentColor' : 'none'} fillOpacity={a ? 0.25 : 0} /></svg>) },
  { key: 'search', label: 'search', path: '/search', icon: () => (<svg {...ICON}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>) },
  { key: 'tools', label: 'tools', path: '/tools', icon: () => (<svg {...ICON}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2.2" /><circle cx="9" cy="17" r="2.2" /></svg>) },
]

/** Bottom tab bar: five destinations, the current one in the accent. */
function TabBar() {
  const { pathname } = useLocation()
  const m = useMotion()
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#101010]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      aria-label="sections"
    >
      <ul className="mx-auto flex h-tab-bar max-w-[640px] items-stretch">
        {TABS.map((t) => {
          const active = t.path === '/' ? pathname === '/' : pathname.startsWith(t.path)
          return (
            <li key={t.key} className="flex-1">
              <Link
                to={t.path}
                aria-current={active ? 'page' : undefined}
                className={`flex h-full flex-col items-center justify-center gap-[3px] text-[11px] leading-none transition-colors duration-(--motion-quick) ${
                  active ? 'text-accent' : 'text-white/60'
                }`}
              >
                <motion.span whileTap={m.press} transition={m.focus(true)} className="flex items-center justify-center">
                  {t.icon(active)}
                </motion.span>
                {t.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
