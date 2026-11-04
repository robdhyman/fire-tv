import { useEffect, useRef, useState, type ButtonHTMLAttributes } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useFocusContext, type NavEvent } from '../focus/FocusEngine'
import { useMotion } from '../motion/useMotion'
import { cycle, pick, resetPicks, stepDb, useSoundPicks, voiceOf } from './picks'
import { MASTER_DB, play, wake } from './synth'
import { candidate, DEFAULT_PICKS, LETTERS, NAV_EVENTS } from './voices'

/*
 * Sound picker (issue #43): issue #29's sound lab, shipped. A chip at the
 * bottom-left, mirroring the remote overlay's, or N toggles a panel that
 * picks one of four voices (A-D) for each nav event. Like the remote it is
 * chrome around the stage, never a focus lane: its buttons never take focus,
 * so the D-pad keeps driving the app and every pick is heard in context.
 * While it is open 1-4 cycle an event's voice, 0 plays all four and [ ] step
 * the volume. Previews play even when the sound toggle has muted the nav.
 * Hidden below 768px, like the remote.
 */

const ROWS: { ev: NavEvent; key: string; label: string }[] = [
  { ev: 'move', key: '1', label: 'move' },
  { ev: 'select', key: '2', label: 'select' },
  { ev: 'back', key: '3', label: 'back' },
  { ev: 'bump', key: '4', label: 'edge bump' },
]

/** A short phrase of every event: three moves, a select, a back, a bump. */
const PHRASE: [NavEvent, number][] = [['move', 0], ['move', 180], ['move', 360], ['select', 700], ['back', 1300], ['bump', 1900]]

export function SoundPicker() {
  const m = useMotion()
  const { onNav } = useFocusContext()
  const { picks, db } = useSoundPicks()
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState<{ ev: NavEvent; n: number } | null>(null)
  const openRef = useRef(open)
  openRef.current = open

  const flash = (ev: NavEvent) => setLast((l) => ({ ev, n: (l?.n ?? 0) + 1 }))
  const preview = (ev: NavEvent) => {
    wake()
    play(voiceOf(ev))
    flash(ev)
  }
  const playAll = () => PHRASE.forEach(([ev, ms]) => setTimeout(() => preview(ev), ms))

  // Light the row of whatever the app just played, so a sound heard in context has a name.
  useEffect(() => onNav((ev) => openRef.current && flash(ev)), [onNav])

  useEffect(() => {
    // Capture, so the context is awake before the focus engine asks for a sound.
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'n' || e.key === 'N') setOpen((o) => !o)
      else if (!openRef.current) return
      else if (ROWS.some((r) => r.key === e.key)) {
        const { ev } = ROWS.find((r) => r.key === e.key)!
        cycle(ev)
        preview(ev)
      } else if (e.key === '0') playAll()
      else if (e.key === '[') stepDb(-1)
      else if (e.key === ']') stepDb(1)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])

  const isDefault = NAV_EVENTS.every((ev) => picks[ev] === DEFAULT_PICKS[ev])

  return (
    <div className="hidden md:block">
      <div className="fixed bottom-[16px] left-[16px] z-[101]">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setOpen((o) => !o)}
          className={`flex h-[44px] items-center gap-[8px] rounded-full border px-[14px] text-[13px] shadow-lg backdrop-blur transition-colors duration-(--motion-quick) ${
            open ? 'border-white/60 bg-white text-black' : 'border-white/25 bg-black/70 text-white/85 hover:bg-black/90'
          }`}
          aria-pressed={open}
          title="Show or hide the sound picker (N)"
        >
          <WaveGlyph />
          sounds <kbd className="rounded border border-current/40 px-[5px] text-[11px] opacity-70">N</kbd>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="picker"
            role="dialog"
            aria-label="Sound picker"
            className="fixed bottom-[72px] left-[24px] z-[101] w-[380px] rounded-[20px] border border-white/15 bg-gradient-to-b from-[#2b2b2e] to-[#141416] p-[16px] text-[13px] text-white/85 shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
            style={{ transformOrigin: 'bottom left' }}
            initial={{ opacity: 0, scale: m.reduced ? 1 : 0.92, y: m.reduced ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: m.reduced ? m.fade : { ...m.focus(true), opacity: m.fade } }}
            exit={{ opacity: 0, scale: m.reduced ? 1 : 0.92, transition: m.fade }}
          >
            <div className="mb-[12px] flex items-baseline justify-between">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/45">SOUND PICKER</span>
              <span className="text-[11px] text-white/45">pick a voice for each sound</span>
            </div>

            {ROWS.map(({ ev, key, label }) => {
              const lit = last?.ev === ev
              return (
                <div key={ev} className="mb-[8px] flex items-center gap-[10px]">
                  <kbd className="w-[20px] shrink-0 rounded border border-white/30 text-center text-[11px] text-white/60">{key}</kbd>
                  <span
                    key={lit ? last.n : 0}
                    className={`w-[78px] shrink-0 ${lit ? 'animate-[pickflash_500ms_ease-out]' : ''}`}
                  >
                    {label}
                  </span>
                  <span className="flex shrink-0 gap-[4px]">
                    {LETTERS.map((l) => {
                      const on = picks[ev] === l
                      return (
                        <button
                          key={l}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            pick(ev, l)
                            preview(ev)
                          }}
                          className={`h-[28px] w-[28px] rounded-full border text-[12px] transition-colors duration-(--motion-quick) ${
                            on ? 'border-transparent bg-[var(--color-accent)] font-semibold text-black' : 'border-white/15 bg-white/10 hover:bg-white/20'
                          }`}
                          aria-pressed={on}
                          aria-label={`${label}: ${l}, ${candidate(ev, l).name}`}
                          title={candidate(ev, l).name}
                        >
                          {l}
                        </button>
                      )
                    })}
                  </span>
                  <span className="truncate text-white/60">{candidate(ev, picks[ev]).name}</span>
                </div>
              )
            })}

            <div className="mt-[12px] flex items-center gap-[8px] border-t border-white/10 pt-[12px]">
              <PanelButton onClick={playAll} title="Play all four (0)">
                ▶ play all <kbd className="opacity-60">0</kbd>
              </PanelButton>
              <span className="ml-auto flex items-center gap-[4px]">
                <PanelButton onClick={() => stepDb(-1)} title="Quieter, 3 dB ([)" aria-label="Quieter">−</PanelButton>
                <span className="w-[52px] text-center tabular-nums text-white/70">{db > 0 ? '+' : ''}{db} dB</span>
                <PanelButton onClick={() => stepDb(1)} title="Louder, 3 dB (])" aria-label="Louder">+</PanelButton>
              </span>
              <PanelButton onClick={resetPicks} title="Back to the 3 Nov picks and volume" disabled={isDefault && db === MASTER_DB}>
                reset
              </PanelButton>
            </div>
            <style>{'@keyframes pickflash { from { color: var(--color-accent) } to { color: inherit } }'}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PanelButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      className="h-[28px] rounded-full border border-white/15 bg-white/10 px-[10px] text-[12px] transition-colors duration-(--motion-quick) hover:bg-white/20 disabled:opacity-35 disabled:hover:bg-white/10"
      {...props}
    >
      {children}
    </button>
  )
}

const WaveGlyph = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M1.5 7h1M4.5 4v6M7.5 1.5v11M10.5 4.5v5M13.5 6v2" />
  </svg>
)
