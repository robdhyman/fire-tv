/*
 * PROTOTYPE (issue #30), throwaway. Three layouts of the tile overlay on the
 * 590x332 tile, plus the open parameters (dwell delay, darkening, synopsis
 * cap), switchable from a bar outside the stage. Dev builds only. Kept on the
 * `prototype/dwell-overlay` branch; main keeps only the layout Rob picks.
 *
 *   ?variant=A|B|C&delay=1.2&darken=1&lines=2
 *   keys: v next layout, d delay, k darken, l synopsis lines
 */
import { useEffect, useSyncExternalStore } from 'react'
import { motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'
import type { EpisodeRef } from '../data/catalogue'
import { EpisodeLabel } from './Row'
import { OverlayButtons } from './TileOverlay'

type Variant = 'A' | 'B' | 'C'
const VARIANTS: Variant[] = ['A', 'B', 'C']
const NAMES: Record<Variant, string> = { A: 'stack', B: 'text left, buttons bottom right', C: 'buttons centred' }
const DELAYS = [0.8, 1.2, 1.6, 2]
const LINES = [2, 3, 0]

type Config = { variant: Variant; delay: number; darken: boolean; lines: number }

const params = new URLSearchParams(window.location.search)
let config: Config = {
  variant: (VARIANTS as string[]).includes(params.get('variant') ?? '') ? (params.get('variant') as Variant) : 'A',
  delay: Number(params.get('delay') ?? 1.2) || 1.2,
  darken: params.get('darken') !== '0',
  lines: Number(params.get('lines') ?? 2),
}
const listeners = new Set<() => void>()

function set(patch: Partial<Config>) {
  config = { ...config, ...patch }
  const url = new URL(window.location.href)
  url.searchParams.set('variant', config.variant)
  url.searchParams.set('delay', String(config.delay))
  url.searchParams.set('darken', config.darken ? '1' : '0')
  url.searchParams.set('lines', String(config.lines))
  window.history.replaceState(window.history.state, '', url)
  listeners.forEach((fn) => fn())
}

const next = <T,>(list: T[], value: T, step = 1) => list[(list.indexOf(value) + step + list.length) % list.length]

export function usePrototype() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    () => config,
  )
}

/** The overlay as the current variant draws it. */
export function PrototypeOverlay({ episode: ref, selected, added }: { episode: EpisodeRef; selected: number; added: boolean }) {
  const m = useMotion()
  const { variant, darken, lines } = usePrototype()
  const clamp = lines === 2 ? 'line-clamp-2' : lines === 3 ? 'line-clamp-3' : ''
  const show = <div className="text-[23px] font-light uppercase leading-none tracking-[0.04em] text-white/85">{ref.show.title}</div>
  const episode = (
    <div className="mt-[8px] truncate text-[25px] leading-[1.1] text-white">
      <EpisodeLabel season={ref.season.number} number={ref.episode.number} title={ref.episode.title} />
    </div>
  )
  const synopsis = (cls: string) => <p className={`text-[23px] font-light leading-[1.3] text-white ${clamp} ${cls}`}>{ref.episode.synopsis}</p>
  const scrim = darken
    ? 'bg-black/55'
    : variant === 'C'
      ? 'bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0)_35%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.75))]'
      : 'bg-gradient-to-r from-black/75 via-black/35 to-transparent'

  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={m.overlay}>
      <div className={`absolute inset-0 ${scrim}`} />
      {variant === 'A' && (
        <div className="absolute inset-0 flex flex-col items-start p-[24px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          {show}
          {episode}
          <OverlayButtons selected={selected} added={added} className="mt-[22px] pl-[3px]" />
          {synopsis('mt-[20px] max-w-[540px]')}
        </div>
      )}
      {variant === 'B' && (
        <>
          {!darken && <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-black/60 to-transparent" />}
          <div className="absolute left-[24px] top-[24px] w-[320px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {show}
            {episode}
            {synopsis('mt-[16px]')}
          </div>
          <OverlayButtons selected={selected} added={added} className="absolute bottom-[27px] right-[27px]" />
        </>
      )}
      {variant === 'C' && (
        <>
          <div className="absolute left-[24px] right-[24px] top-[24px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {show}
            {episode}
          </div>
          <div className="absolute inset-x-0 top-[136px] flex justify-center">
            <OverlayButtons selected={selected} added={added} />
          </div>
          {synopsis('absolute bottom-[22px] left-[40px] right-[40px] text-center drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]')}
        </>
      )}
    </motion.div>
  )
}

/** The floating switcher, outside the stage so the mouse works on it. */
export function PrototypeBar() {
  const c = usePrototype()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'v' || e.key === 'V') set({ variant: next(VARIANTS, config.variant, e.shiftKey ? -1 : 1) })
      else if (e.key === 'd') set({ delay: next(DELAYS, config.delay) })
      else if (e.key === 'k') set({ darken: !config.darken })
      else if (e.key === 'l') set({ lines: next(LINES, config.lines) })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const chip = 'rounded-full px-[8px] py-[4px] hover:bg-white/15'
  return (
    <div className="fixed left-1/2 top-[8px] z-[102] flex -translate-x-1/2 items-center gap-[2px] whitespace-nowrap rounded-full bg-[#ff3d7f] px-[6px] py-[3px] font-mono text-[12px] text-white shadow-[0_6px_24px_rgba(0,0,0,0.5)]">
      <span className="px-[6px] font-bold">#30</span>
      <button type="button" className={chip} onClick={() => set({ variant: next(VARIANTS, c.variant, -1) })} aria-label="previous layout">
        ‹
      </button>
      <span className="text-center">
        {c.variant}: {NAMES[c.variant]}
      </span>
      <button type="button" className={chip} onClick={() => set({ variant: next(VARIANTS, c.variant) })} aria-label="next layout">
        ›
      </button>
      <button type="button" className={chip} onClick={() => set({ delay: next(DELAYS, c.delay) })}>
        dwell {c.delay.toFixed(1)} s
      </button>
      <button type="button" className={chip} onClick={() => set({ darken: !c.darken })}>
        darken {c.darken ? 'on' : 'off'}
      </button>
      <button type="button" className={chip} onClick={() => set({ lines: next(LINES, c.lines) })}>
        synopsis {c.lines ? `${c.lines} lines` : 'no cap'}
      </button>
    </div>
  )
}
