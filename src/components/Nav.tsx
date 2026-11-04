import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'
import { useFocusContext, useFocusable } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { Logo } from './Logo'

export type NavKey = 'shows' | 'watchlist' | 'tools' | 'search'

const WORDS: { key: Exclude<NavKey, 'tools'>; path: string }[] = [
  { key: 'shows', path: '/shows' },
  { key: 'watchlist', path: '/watchlist' },
  { key: 'search', path: '/search' },
]

/** Where the avatar lands: the Tools screen's focus memory key and its `sign out` item. */
const TOOLS_SCREEN = 'tools'
const SIGN_OUT = 'tools:menu:sign out'

/*
 * One lane. Every item is set in a 38px line with no leading (Figtree puts
 * the baseline 0.85em down that box), and the bar aligns baselines, so the
 * logo, the words and the icons share one box height and centre: Down from
 * any of them leaves the nav. Icons are 1em glyphs dropped 0.15em below the
 * baseline to fill that same box. The current screen's item grows to 50px
 * and sits 4px off-centre, inside the focus engine's lane slack.
 */
const LINE = 'text-[38px] leading-none'

function NavItem({ item, active }: { item: (typeof WORDS)[number]; active: boolean }) {
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

/*
 * The nav's ends are walls. With no item further along the lane, a sideways
 * press would fall back to the nearest item out of it (a row tile peeking at
 * the stage edge), so the logo keeps Left and the avatar keeps Right.
 */
const keepLeft = (key: string) => key === 'ArrowLeft'
const keepRight = (key: string) => key === 'ArrowRight'

type IconItemProps = { id: string; label: string; active: boolean; onSelect: () => void; onKey?: (key: string) => boolean; children: ReactNode }

/** A nav icon: a word's size and colour states, and an accent bar where a word's underline would sit. */
function IconItem({ id, label, active, onSelect, onKey, children }: IconItemProps) {
  const { focused, props } = useFocusable(id, { onSelect, onKey })
  return (
    <div
      {...props}
      aria-label={label}
      className={`relative leading-none transition-colors duration-(--motion-quick) ${active ? 'text-[50px]' : 'text-[38px]'} ${
        active || focused ? 'text-white' : 'text-white/60'
      }`}
    >
      {children}
      {/* 10px below the baseline, as on the words; the box ends 0.15em below it. */}
      {focused && <span className="absolute inset-x-0 top-[calc(100%-0.15em+10px)] h-[3px] bg-accent" />}
    </div>
  )
}

const GEAR = (
  <svg
    className="inline-block size-[1em] align-[-0.15em]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinejoin="round"
  >
    <path d="M10.4 4.57L10.67 2.09L13.33 2.09L13.6 4.57L16.12 5.62L18.07 4.05L19.95 5.93L18.38 7.88L19.43 10.4L21.91 10.67L21.91 13.33L19.43 13.6L18.38 16.12L19.95 18.07L18.07 19.95L16.12 18.38L13.6 19.43L13.33 21.91L10.67 21.91L10.4 19.43L7.88 18.38L5.93 19.95L4.05 18.07L5.62 16.12L4.57 13.6L2.09 13.33L2.09 10.67L4.57 10.4L5.62 7.88L4.05 5.93L5.93 4.05L7.88 5.62Z" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)

/** No accounts in this demo: a neutral head and shoulders on a round plate. */
const AVATAR = (
  <span className="inline-block size-[1em] overflow-hidden rounded-full bg-white/20 align-[-0.15em]">
    <svg className="block size-full" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="9.5" r="4.2" />
      <path d="M3.5 24c.6-5.2 4-8.2 8.5-8.2s7.9 3 8.5 8.2z" />
    </svg>
  </span>
)

/**
 * Top bar: brand logo, `shows`, `watchlist` and `search` on the left; the
 * gear and the account avatar flush right at the safe inset (x = 1720), both
 * opening Tools. `active` marks the current screen.
 */
export function Nav({ active }: { active?: NavKey }) {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const { memory, setFocus } = useFocusContext()
  const m = useMotion()
  const logo = useFocusable('nav:logo', { onSelect: () => navigate('/'), onKey: keepLeft })
  const openAccount = () => {
    // Seed Tools' focus memory so it opens on `sign out`; Back into Tools still restores where focus last was.
    memory.set(TOOLS_SCREEN, SIGN_OUT)
    if (active === 'tools') setFocus(SIGN_OUT)
    else navigate('/tools')
  }
  return (
    <motion.header
      className="absolute left-[200px] right-[200px] top-[48px] z-20 flex h-[64px] items-baseline gap-[60px]"
      variants={m.part}
    >
      <motion.div
        {...logo.props}
        className={LINE}
        style={{ marginRight: 4 }}
        initial={false}
        animate={{ scale: logo.focused ? m.focusScale : 1 }}
        transition={m.focus(logo.focused)}
      >
        <Logo brand={settings.brand} />
      </motion.div>
      {WORDS.map((item) => (
        <NavItem key={item.key} item={item} active={active === item.key} />
      ))}
      <div className="ml-auto flex items-baseline gap-[32px]">
        <IconItem id="nav:tools" label="tools" active={active === 'tools'} onSelect={() => navigate('/tools')}>
          {GEAR}
        </IconItem>
        <IconItem id="nav:account" label="account" active={false} onSelect={openAccount} onKey={keepRight}>
          {AVATAR}
        </IconItem>
      </div>
    </motion.header>
  )
}
