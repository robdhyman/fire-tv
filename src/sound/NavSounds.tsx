import { useCallback, useEffect, useRef } from 'react'
import { useFocusContext } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { play, wake } from './synth'
import { VOICES } from './voices'

/*
 * Nav sounds (issue #29, ADR 004): a voice for every nav event the focus
 * engine reports, so a key and the remote overlay's button for it sound the
 * same. On by default and remembered; S, the sound chip and Tools toggle
 * them. TV stage only: the touch layout has no focus engine and no sounds.
 */

/** The sound toggle: whether nav sounds are on, and a setter that chimes when it turns them on. */
export function useSoundToggle() {
  const { settings, update } = useSettings()
  const set = useCallback(
    (on: boolean) => {
      update({ navSounds: on })
      if (on) {
        wake()
        play(VOICES.select)
      }
    },
    [update],
  )
  return { on: settings.navSounds, set }
}

export function NavSounds() {
  const { onNav } = useFocusContext()
  const { on, set } = useSoundToggle()
  const onRef = useRef(on)
  onRef.current = on

  useEffect(() => onNav((ev) => onRef.current && play(VOICES[ev])), [onNav])

  useEffect(() => {
    // Capture, so the context is awake before the focus engine reports the key.
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const typing = t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA'
      if (!typing && (e.key === 's' || e.key === 'S') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        set(!onRef.current)
      } else if (onRef.current) wake()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [set])

  return null
}

/** The sound toggle's chip, beside the remote overlay's. */
export function SoundChip() {
  const { on, set } = useSoundToggle()
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => set(!on)}
      className="flex h-[44px] items-center gap-[8px] rounded-full border border-white/25 bg-black/70 px-[14px] text-[13px] text-white/85 shadow-lg backdrop-blur transition-colors duration-(--motion-quick) hover:bg-black/90"
      aria-pressed={on}
      title={`Turn the nav sounds ${on ? 'off' : 'on'} (S)`}
    >
      <SpeakerGlyph on={on} />
      {on ? 'sound' : 'muted'} <kbd className="rounded border border-current/40 px-[5px] text-[11px] opacity-70">S</kbd>
    </button>
  )
}

const SpeakerGlyph = ({ on }: { on: boolean }) => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 5h2.5L7.5 2v10L4 9H1.5z" />
    {on ? <path d="M10 4.5a3.5 3.5 0 0 1 0 5M12 2.5a6.3 6.3 0 0 1 0 9" /> : <path d="M10.5 5l4 4M14.5 5l-4 4" />}
  </svg>
)
