import { useSyncExternalStore } from 'react'
import type { NavEvent } from '../focus/FocusEngine'
import { MASTER_DB, setMasterDb } from './synth'
import { candidate, DEFAULT_PICKS, LETTERS, NAV_EVENTS, type Letter, type Picks } from './voices'

/*
 * The sound picker's state (issue #43): which A-D voice each nav event plays
 * and the master volume, persisted in localStorage `fire-tv.sounds`. A module
 * store rather than a setting, so the focus engine's sound callback reads the
 * live pick without a render.
 */

export type SoundPicks = { picks: Picks; db: number }

const KEY = 'fire-tv.sounds'
const DEFAULTS: SoundPicks = { picks: DEFAULT_PICKS, db: MASTER_DB }
/** Volume steps 3dB, from silent-ish to a little over unity. */
export const DB_STEP = 3
const DB_MIN = -30
const DB_MAX = 6

function load(): SoundPicks {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<SoundPicks> | null
    if (!raw) return DEFAULTS
    const picks = { ...DEFAULT_PICKS }
    for (const ev of NAV_EVENTS) if (LETTERS.includes(raw.picks?.[ev] as Letter)) picks[ev] = raw.picks![ev]
    const db = typeof raw.db === 'number' ? clampDb(raw.db) : MASTER_DB
    return { picks, db }
  } catch {
    return DEFAULTS
  }
}

const clampDb = (db: number) => Math.min(DB_MAX, Math.max(DB_MIN, db))

let state = load()
setMasterDb(state.db)
const listeners = new Set<() => void>()

function set(next: SoundPicks) {
  state = next
  setMasterDb(state.db)
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* no storage */
  }
  listeners.forEach((l) => l())
}

export const getSoundPicks = () => state

/** The voice an event plays now. */
export const voiceOf = (ev: NavEvent) => candidate(ev, state.picks[ev]).voice

export const pick = (ev: NavEvent, letter: Letter) => set({ ...state, picks: { ...state.picks, [ev]: letter } })
export const cycle = (ev: NavEvent) => pick(ev, LETTERS[(LETTERS.indexOf(state.picks[ev]) + 1) % LETTERS.length])
export const stepDb = (dir: 1 | -1) => set({ ...state, db: clampDb(state.db + dir * DB_STEP) })
export const resetPicks = () => set(DEFAULTS)

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const useSoundPicks = () => useSyncExternalStore(subscribe, getSoundPicks)
