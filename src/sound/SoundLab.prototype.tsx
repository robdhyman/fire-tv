import { useEffect, useRef, useState } from 'react'
import { useFocusContext, type NavEvent } from '../focus/FocusEngine'
import { CANDIDATES } from './candidates.prototype'
import { MASTER_DB, play, setMasterDb, wake } from './synth'

/*
 * PROTOTYPE (issue #29), throwaway: the sound lab. Dev server only, on any
 * route with `?prototype=sounds`. Navigate the real app to hear the current
 * picks in context; 1-4 cycle the voicing for move, select, back and bump
 * (and play it); 0 plays a phrase of all four; [ and ] step the volume 3dB.
 * Picks live in the URL (`&move=B&select=A…`) so a reload keeps them.
 */

const EVENTS: { ev: NavEvent; key: string; label: string }[] = [
  { ev: 'move', key: '1', label: 'move (tick)' },
  { ev: 'select', key: '2', label: 'select (pop)' },
  { ev: 'back', key: '3', label: 'back (lower pop)' },
  { ev: 'bump', key: '4', label: 'edge bump' },
]
const LETTERS = ['A', 'B', 'C', 'D']

type Picks = Record<NavEvent, number>

function readPicks(): Picks {
  const q = new URLSearchParams(window.location.search)
  const pick = (ev: NavEvent) => Math.max(0, LETTERS.indexOf(q.get(ev) ?? 'A'))
  return { move: pick('move'), select: pick('select'), back: pick('back'), bump: pick('bump') }
}

function writePicks(picks: Picks, db: number) {
  const q = new URLSearchParams(window.location.search)
  for (const { ev } of EVENTS) q.set(ev, LETTERS[picks[ev]])
  q.set('db', String(db))
  window.history.replaceState(window.history.state, '', `${window.location.pathname}?${q}`)
}

export const soundLabOn = import.meta.env.DEV && new URLSearchParams(window.location.search).get('prototype') === 'sounds'

export function SoundLab() {
  const { onNav } = useFocusContext()
  const [picks, setPicks] = useState<Picks>(readPicks)
  const [db, setDb] = useState(() => Number(new URLSearchParams(window.location.search).get('db') ?? MASTER_DB))
  const [last, setLast] = useState<{ ev: NavEvent; n: number } | null>(null)
  const picksRef = useRef(picks)
  picksRef.current = picks

  const sound = (ev: NavEvent, p = picksRef.current) => {
    play(CANDIDATES[ev][p[ev]].voice)
    setLast((l) => ({ ev, n: (l?.n ?? 0) + 1 }))
  }

  useEffect(() => setMasterDb(db), [db])
  useEffect(() => writePicks(picks, db), [picks, db])

  useEffect(() => onNav((ev) => sound(ev)), [onNav])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      wake()
      const t = e.target as HTMLElement | null
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return
      const row = EVENTS.find((r) => r.key === e.key)
      if (row) {
        const next = { ...picksRef.current, [row.ev]: (picksRef.current[row.ev] + 1) % LETTERS.length }
        setPicks(next)
        sound(row.ev, next)
      } else if (e.key === '0') {
        const phrase: [NavEvent, number][] = [['move', 0], ['move', 180], ['move', 360], ['select', 700], ['back', 1300], ['bump', 1900]]
        phrase.forEach(([ev, ms]) => setTimeout(() => sound(ev), ms))
      } else if (e.key === '[') setDb((d) => d - 3)
      else if (e.key === ']') setDb((d) => Math.min(6, d + 3))
      else return
      e.preventDefault()
    }
    // Capture, so the lab wakes the context before the focus engine asks for a sound.
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])

  return (
    <div className="fixed left-[12px] top-[12px] z-[200] w-[340px] rounded-[10px] border-2 border-dashed border-[#ff3df2] bg-black/90 p-[12px] font-mono text-[12px] text-white shadow-xl">
      <div className="mb-[8px] flex justify-between text-[11px] tracking-[0.12em] text-[#ff3df2]">
        <span>PROTOTYPE · NAV SOUNDS (#29)</span>
        <span>{db > 0 ? '+' : ''}{db} dB</span>
      </div>
      {EVENTS.map(({ ev, key, label }) => {
        const c = CANDIDATES[ev][picks[ev]]
        const lit = last?.ev === ev
        return (
          <div key={ev} className="mb-[6px] flex items-center gap-[8px]">
            <kbd className="w-[20px] rounded border border-white/40 text-center">{key}</kbd>
            <span
              key={lit ? last.n : 0}
              className={`w-[118px] ${lit ? 'animate-[labflash_400ms_ease-out]' : ''}`}
            >
              {label}
            </span>
            <span className="flex gap-[3px]">
              {LETTERS.map((l, i) => (
                <span key={l} className={`w-[16px] rounded text-center ${i === picks[ev] ? 'bg-white text-black' : 'text-white/45'}`}>
                  {l}
                </span>
              ))}
            </span>
            <span className="truncate text-white/70">{c.name}</span>
          </div>
        )
      })}
      <div className="mt-[8px] border-t border-white/20 pt-[8px] text-[11px] leading-[1.5] text-white/60">
        arrows / enter / esc: hear the picks in the app · 0: play all four · [ ]: volume
      </div>
      <style>{'@keyframes labflash { from { color: #ff3df2 } to { color: inherit } }'}</style>
    </div>
  )
}
