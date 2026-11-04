import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Brand } from '../data/catalogue'

/* App settings and the viewer's watchlist, persisted in localStorage. */

export type CaptionStyle = { color: string; background: string }
export const CAPTION_SIZES = [27, 34, 41] as const
export const CAPTION_STYLES: CaptionStyle[] = [
  { color: '#ffffff', background: 'rgba(0,0,0,0.7)' },
  { color: '#d0d0d0', background: 'transparent' },
  { color: 'var(--color-accent)', background: 'rgba(0,0,0,0.7)' },
  { color: 'var(--color-accent)', background: 'transparent' },
  { color: '#ffffff', background: 'rgba(120,120,120,0.9)' },
]

export type Settings = {
  brand: Brand
  captions: { on: boolean; size: number; style: number }
  audio: { on: boolean; lang: 'en' | 'es' }
  /** Nav sounds (issue #29): the sound toggle's state, on by default. */
  navSounds: boolean
  watchlist: string[]
  hintSeen: boolean
}

const DEFAULTS: Settings = {
  brand: 'syfy',
  captions: { on: false, size: 0, style: 0 },
  audio: { on: false, lang: 'en' },
  navSounds: true,
  watchlist: ['ember-hollow', 'ringfall', 'pale-street', 'the-long-dry'],
  hintSeen: false,
}

const KEY = 'fire-tv.settings'

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    /* no storage */
  }
  return DEFAULTS
}

type Ctx = {
  settings: Settings
  update: (patch: Partial<Settings> | ((s: Settings) => Partial<Settings>)) => void
  toggleWatchlist: (showId: string) => void
  inWatchlist: (showId: string) => boolean
}

const SettingsContext = createContext<Ctx | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {
      /* no storage */
    }
    document.documentElement.dataset.brand = settings.brand
  }, [settings])

  const value = useMemo<Ctx>(
    () => ({
      settings,
      update: (patch) => setSettings((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
      toggleWatchlist: (id) =>
        setSettings((s) => ({
          ...s,
          watchlist: s.watchlist.includes(id) ? s.watchlist.filter((x) => x !== id) : [...s.watchlist, id],
        })),
      inWatchlist: (id) => settings.watchlist.includes(id),
    }),
    [settings],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('SettingsProvider missing')
  return ctx
}
