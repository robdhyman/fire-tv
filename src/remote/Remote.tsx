import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import { useMotion } from '../motion/useMotion'
import { LABELS, press, useLit, type RemoteButton } from './keys'

/*
 * Remote overlay (issue #10): a small Fire TV remote reviewers summon with
 * the corner button or R, drag anywhere, and hide again. It sits outside the
 * scaled stage, in window pixels, and is hidden below 768px (phone, tablet).
 *
 * PROTOTYPE: three forms of the same remote, switchable with the pill above
 * it (`?remote=classic|puck|strip`). The losers go to a throwaway branch once
 * Rob picks; the wiring (keys.ts) stays.
 */

const VARIANTS = ['classic', 'puck', 'strip'] as const
type Variant = (typeof VARIANTS)[number]
const NAMES: Record<Variant, string> = { classic: 'A · classic', puck: 'B · puck', strip: 'C · strip' }

function initialVariant(): Variant {
  const v = new URLSearchParams(window.location.search).get('remote')
  return VARIANTS.includes(v as Variant) ? (v as Variant) : 'classic'
}

export function RemoteOverlay() {
  const m = useMotion()
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState<Variant>(initialVariant)
  const bounds = useRef<HTMLDivElement>(null)
  const drag = useDragControls()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA') return
      if ((e.key === 'r' || e.key === 'R') && !e.metaKey && !e.ctrlKey && !e.altKey) setOpen((o) => !o)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cycle = (d: number) => {
    const next = VARIANTS[(VARIANTS.indexOf(variant) + d + VARIANTS.length) % VARIANTS.length]
    setVariant(next)
    const url = new URL(window.location.href)
    url.searchParams.set('remote', next)
    window.history.replaceState(window.history.state, '', url)
  }

  // Drag from the body, never from a button.
  const startDrag = (e: PointerEvent) => {
    if (!(e.target as HTMLElement).closest('button')) drag.start(e)
  }

  return (
    <div className="hidden md:block">
      <div ref={bounds} className="pointer-events-none fixed inset-[8px] z-[100]" />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-[16px] right-[16px] z-[101] flex h-[44px] items-center gap-[8px] rounded-full border px-[14px] text-[13px] shadow-lg backdrop-blur transition-colors duration-(--motion-quick) ${
          open ? 'border-white/60 bg-white text-black' : 'border-white/25 bg-black/70 text-white/85 hover:bg-black/90'
        }`}
        aria-pressed={open}
        title="Show or hide the on-screen remote (R)"
      >
        <RemoteGlyph />
        remote <kbd className="rounded border border-current/40 px-[5px] text-[11px] opacity-70">R</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="remote"
            className="fixed bottom-[72px] right-[24px] z-[101] flex touch-none flex-col items-end gap-[8px]"
            drag
            dragControls={drag}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={bounds}
            dragElastic={0}
            initial={{ opacity: 0, scale: m.reduced ? 1 : 0.92, y: m.reduced ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: m.reduced ? m.fade : { ...m.focus(true), opacity: m.fade } }}
            exit={{ opacity: 0, scale: m.reduced ? 1 : 0.92, transition: m.fade }}
          >
            <div className="flex items-center gap-[2px] rounded-full bg-[#ffd400] px-[4px] py-[2px] text-[11px] font-semibold text-black shadow">
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => cycle(-1)} className="px-[6px]" aria-label="previous variant">
                ‹
              </button>
              <span>prototype {NAMES[variant]}</span>
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => cycle(1)} className="px-[6px]" aria-label="next variant">
                ›
              </button>
            </div>
            <div onPointerDown={startDrag} className="cursor-grab active:cursor-grabbing">
              {variant === 'classic' && <Classic />}
              {variant === 'puck' && <Puck />}
              {variant === 'strip' && <Strip />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Variant A: the Alexa Voice Remote, upright, about 13cm tall at 1:1.3 ---------- */

function Classic() {
  const lit = useLit()
  return (
    <div className="flex w-[132px] flex-col items-center gap-[16px] rounded-[48px] border border-white/15 bg-gradient-to-b from-[#2b2b2e] to-[#141416] px-[10px] pb-[26px] pt-[18px] shadow-[0_18px_40px_rgba(0,0,0,0.6)]">
      <div className="h-[6px] w-[6px] rounded-full bg-[#4aa8ff] shadow-[0_0_8px_#4aa8ff]" title="voice (not wired)" />
      <Ring size={112} lit={lit} />
      <div className="flex gap-[10px]">
        <Key b="back" lit={lit} size={32}><BackIcon /></Key>
        <Key b="home" lit={lit} size={32}><HomeIcon /></Key>
        <Key b="menu" lit={lit} size={32}><MenuIcon /></Key>
      </div>
      <div className="flex gap-[10px]">
        <Key b="rewind" lit={lit} size={32}><RewIcon /></Key>
        <Key b="playPause" lit={lit} size={32}><PlayIcon /></Key>
        <Key b="fastForward" lit={lit} size={32}><FfIcon /></Key>
      </div>
      <div className="mt-[6px] text-[9px] font-semibold tracking-[0.2em] text-white/30">fire tv</div>
    </div>
  )
}

/* ---------- Variant B: a puck, the ring is the body and the keys orbit below it ---------- */

function Puck() {
  const lit = useLit()
  const orbit: [RemoteButton, ReactNode][] = [
    ['back', <BackIcon />],
    ['home', <HomeIcon />],
    ['menu', <MenuIcon />],
    ['rewind', <RewIcon />],
    ['playPause', <PlayIcon />],
    ['fastForward', <FfIcon />],
  ]
  const R = 112
  return (
    <div className="relative h-[232px] w-[232px]">
      <div className="absolute left-1/2 top-[12px] -translate-x-1/2 rounded-full p-[8px] shadow-[0_18px_40px_rgba(0,0,0,0.6)] backdrop-blur bg-black/60 border border-white/15">
        <Ring size={150} lit={lit} />
      </div>
      {orbit.map(([b, icon], i) => {
        // Spread along the lower arc, left to right: 245° to 115° clockwise from the top.
        const a = ((245 - (i * 130) / (orbit.length - 1)) * Math.PI) / 180
        const cx = 116 + Math.sin(a) * R
        const cy = 95 - Math.cos(a) * R
        return (
          <Key key={b} b={b} lit={lit} size={30} style={{ position: 'absolute', left: cx - 15, top: cy - 15 }}>
            {icon}
          </Key>
        )
      })}
    </div>
  )
}

/* ---------- Variant C: a low strip, keys either side of a small ring ---------- */

function Strip() {
  const lit = useLit()
  return (
    <div className="flex h-[96px] items-center gap-[12px] rounded-full border border-white/15 bg-black/70 px-[18px] shadow-[0_18px_40px_rgba(0,0,0,0.6)] backdrop-blur">
      <Key b="back" lit={lit} size={34}><BackIcon /></Key>
      <Key b="home" lit={lit} size={34}><HomeIcon /></Key>
      <Key b="menu" lit={lit} size={34}><MenuIcon /></Key>
      <div className="mx-[4px]"><Ring size={80} lit={lit} /></div>
      <Key b="rewind" lit={lit} size={34}><RewIcon /></Key>
      <Key b="playPause" lit={lit} size={34}><PlayIcon /></Key>
      <Key b="fastForward" lit={lit} size={34}><FfIcon /></Key>
    </div>
  )
}

/* ---------- Shared parts ---------- */

const LIT_BG = 'bg-[var(--color-accent)] text-black'

function Key({ b, lit, size, children, style }: { b: RemoteButton; lit: Set<RemoteButton>; size: number; children: ReactNode; style?: CSSProperties }) {
  const on = lit.has(b)
  return (
    <button
      type="button"
      aria-label={LABELS[b]}
      title={LABELS[b]}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => press(b)}
      className={`flex shrink-0 items-center justify-center rounded-full border transition-colors duration-(--motion-quick) ${
        on ? `${LIT_BG} border-transparent` : 'border-white/15 bg-white/10 text-white/85 hover:bg-white/20'
      }`}
      style={{ width: size, height: size, ...style }}
    >
      {children}
    </button>
  )
}

/** The D-pad ring: four wedge-shaped hit areas around a round Select. */
function Ring({ size, lit }: { size: number; lit: Set<RemoteButton> }) {
  const wedges: [RemoteButton, string, string][] = [
    ['up', 'polygon(0 0, 100% 0, 50% 50%)', 'left-1/2 top-[6%] -translate-x-1/2'],
    ['right', 'polygon(100% 0, 100% 100%, 50% 50%)', 'right-[6%] top-1/2 -translate-y-1/2 rotate-90'],
    ['down', 'polygon(0 100%, 100% 100%, 50% 50%)', 'bottom-[6%] left-1/2 -translate-x-1/2 rotate-180'],
    ['left', 'polygon(0 0, 0 100%, 50% 50%)', 'left-[6%] top-1/2 -translate-y-1/2 -rotate-90'],
  ]
  const sel = lit.has('select')
  return (
    <div className="relative shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#1d1d20]" style={{ width: size, height: size }}>
      {wedges.map(([b, clip, chevron]) => (
        <button
          key={b}
          type="button"
          aria-label={LABELS[b]}
          title={LABELS[b]}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => press(b)}
          className={`absolute inset-0 transition-colors duration-(--motion-quick) ${lit.has(b) ? 'bg-[var(--color-accent)]/80' : 'hover:bg-white/10'}`}
          style={{ clipPath: clip }}
        >
          <span className={`absolute block text-[11px] leading-none ${chevron} ${lit.has(b) ? 'text-black' : 'text-white/70'}`}>▲</span>
        </button>
      ))}
      <button
        type="button"
        aria-label={LABELS.select}
        title={LABELS.select}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => press('select')}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-(--motion-quick) ${
          sel ? `${LIT_BG} border-transparent` : 'border-white/20 bg-[#2c2c30] hover:bg-[#3a3a3f]'
        }`}
        style={{ width: size * 0.42, height: size * 0.42 }}
      />
    </div>
  )
}

const icon = { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const BackIcon = () => (<svg {...icon}><path d="M6 3 2 7l4 4" /><path d="M2 7h8a4 4 0 0 1 0 8H8" /></svg>)
const HomeIcon = () => (<svg {...icon}><path d="M2 8 8 2.5 14 8" /><path d="M4 7v6.5h8V7" /></svg>)
const MenuIcon = () => (<svg {...icon}><path d="M3 4.5h10M3 8h10M3 11.5h10" /></svg>)
const RewIcon = () => (<svg {...icon} fill="currentColor" stroke="none"><path d="M8 3.5v9L2 8zM14.5 3.5v9L8.5 8z" /></svg>)
const FfIcon = () => (<svg {...icon} fill="currentColor" stroke="none"><path d="M8 3.5v9L14 8zM1.5 3.5v9L7.5 8z" /></svg>)
const PlayIcon = () => (<svg {...icon} fill="currentColor" stroke="none"><path d="M2 3.5v9L7.5 8z" /><rect x="9.5" y="3.5" width="1.8" height="9" /><rect x="12.7" y="3.5" width="1.8" height="9" /></svg>)
const RemoteGlyph = () => (
  <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="1" y="1" width="10" height="16" rx="5" />
    <circle cx="6" cy="6.5" r="2.3" />
  </svg>
)
