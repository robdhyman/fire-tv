import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Brand } from '../data/catalogue'
import {
  catalogue,
  episodeKey,
  episodeRef,
  nextEpisode,
  runtimeSeconds,
  type EpisodeRef,
  type WatchPositions,
} from '../data/catalogue'
import { CREDITS_LEAD } from '../data/playback'

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

/*
 * Watch position per episode, persisted under its own key beside the settings:
 * `fire-tv.watch` holds { [episodeKey]: { elapsed, runtime } } in seconds, in
 * Up Next order. The first run seeds it from the catalogue's Up Next. Both
 * Players record into it; once the credits start the episode is finished and
 * its entry hands over, in place, to the next episode at zero.
 */

const WATCH_KEY = 'fire-tv.watch'

function seedWatch(): WatchPositions {
  const watch: WatchPositions = {}
  for (const u of catalogue.rows.upNext) {
    const ref = episodeRef(u.show, u.season, u.episode, {})
    if (!ref) continue
    const runtime = runtimeSeconds(ref)
    watch[episodeKey(ref)] = { elapsed: Math.floor(runtime * u.progress), runtime }
  }
  return watch
}

function loadWatch(): WatchPositions {
  try {
    const raw = localStorage.getItem(WATCH_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* no storage */
  }
  return seedWatch()
}

/** The positions after the Player reports `elapsed` seconds into `ref`. */
function recorded(watch: WatchPositions, ref: EpisodeRef, elapsed: number): WatchPositions {
  const key = episodeKey(ref)
  const runtime = runtimeSeconds(ref)
  if (elapsed < runtime - CREDITS_LEAD) {
    const at = Math.floor(elapsed)
    return watch[key]?.elapsed === at ? watch : { ...watch, [key]: { elapsed: at, runtime } }
  }
  if (!(key in watch)) return watch
  const next = nextEpisode(ref)
  const nextKey = next && episodeKey(next)
  const out: WatchPositions = {}
  for (const [k, v] of Object.entries(watch)) {
    if (k !== key) out[k] = v
    else if (next && nextKey && !(nextKey in watch)) out[nextKey] = { elapsed: 0, runtime: runtimeSeconds(next) }
  }
  return out
}

type WatchCtx = {
  watch: WatchPositions
  record: (ref: EpisodeRef, elapsed: number) => void
}

const WatchContext = createContext<WatchCtx | null>(null)

export function WatchProvider({ children }: { children: ReactNode }) {
  const [watch, setWatch] = useState<WatchPositions>(loadWatch)

  useEffect(() => {
    try {
      localStorage.setItem(WATCH_KEY, JSON.stringify(watch))
    } catch {
      /* no storage */
    }
  }, [watch])

  const record = useCallback((ref: EpisodeRef, elapsed: number) => setWatch((w) => recorded(w, ref, elapsed)), [])
  const value = useMemo<WatchCtx>(() => ({ watch, record }), [watch, record])

  return <WatchContext.Provider value={value}>{children}</WatchContext.Provider>
}

export function useWatch() {
  const ctx = useContext(WatchContext)
  if (!ctx) throw new Error('WatchProvider missing')
  return ctx
}
