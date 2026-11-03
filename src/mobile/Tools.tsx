import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'
import { CAPTION_SIZES, CAPTION_STYLES, useSettings } from '../state/settings'
import { Pressable, ScreenHeader } from './ui'

const MENU = ['language options', 'sign out', 'reload', 'about', 'terms', 'FAQs', 'contact'] as const
const NOTES: Record<string, string> = {
  'language options': 'English is the only interface language in this demo.',
  about: 'A rebuild of the 2017 NBCU Fire TV prototype. Placeholder art stands in for show IP.',
  terms: 'Portfolio demo. No account, no playback, nothing collected.',
  FAQs: 'Swipe the rails, tap a tile to open it, tap the picture in the Player for its controls. Switch the brand under “brand”.',
  contact: 'rob hyman · portfolio case study',
}

/** Tools on a phone: a settings list. Captions and audio description as switches, brand as a segmented control, the menu as rows. */
export function MobileTools() {
  const navigate = useNavigate()
  const { settings, update } = useSettings()
  const [note, setNote] = useState<string | null>(null)
  const { captions, audio, brand } = settings
  const style = CAPTION_STYLES[captions.style]

  const onMenu = (label: string) => {
    if (label === 'reload') window.location.reload()
    else if (label === 'sign out') {
      localStorage.clear()
      navigate('/')
    } else setNote(note === label ? null : label)
  }

  return (
    <main>
      <ScreenHeader title="tools" />
      <div className="flex flex-col gap-[16px] px-gutter md:grid md:grid-cols-2">
        <Group title="captions">
          <SwitchRow label="captions" on={captions.on} onChange={(on) => update({ captions: { ...captions, on } })} />
          <div className={`transition-opacity duration-(--motion-fade) ${captions.on ? 'opacity-100' : 'opacity-45'}`}>
            <RowLabel>font size</RowLabel>
            <Segmented
              options={CAPTION_SIZES.map((_, i) => ({ key: String(i), label: <span style={{ fontSize: [14, 18, 22][i] }}>Aa</span> }))}
              value={String(captions.size)}
              onChange={(k) => update({ captions: { ...captions, size: Number(k) } })}
            />
            <RowLabel>font colour &amp; background</RowLabel>
            <div className="flex gap-[6px]">
              {CAPTION_STYLES.map((s, i) => (
                <Pressable
                  key={i}
                  aria-pressed={captions.style === i}
                  onClick={() => update({ captions: { ...captions, style: i } })}
                  className={`flex h-[44px] w-[44px] items-center justify-center rounded-[6px] border-2 text-[16px] ${captions.style === i ? 'border-accent' : 'border-transparent'}`}
                >
                  <span className="flex h-full w-full items-center justify-center rounded-[4px] bg-[#222]" style={{ color: s.color, background: s.background === 'transparent' ? '#222' : s.background }}>
                    Aa
                  </span>
                </Pressable>
              ))}
            </div>
            <p className="mt-[14px] inline-block px-[10px] py-[5px] leading-none" style={{ color: style.color, background: style.background, fontSize: CAPTION_SIZES[captions.size] / 2 }}>
              this is a sample caption
            </p>
          </div>
        </Group>

        <Group title="audio description">
          <SwitchRow label="audio description" on={audio.on} onChange={(on) => update({ audio: { ...audio, on } })} />
          <RowLabel>language</RowLabel>
          <Segmented
            options={[
              { key: 'en', label: 'English' },
              { key: 'es', label: 'Spanish' },
            ]}
            value={audio.lang}
            onChange={(k) => update({ audio: { ...audio, lang: k as 'en' | 'es' } })}
          />
        </Group>

        <Group title="brand">
          <Segmented
            options={[
              { key: 'syfy', label: 'SYFY' },
              { key: 'usa', label: 'USA' },
            ]}
            value={brand}
            onChange={(k) => update({ brand: k as 'syfy' | 'usa' })}
          />
          <p className="mt-[10px] text-[12px] font-light leading-[1.4] text-white/60">Swaps the logo, accent and display face. The catalogue follows the brand.</p>
        </Group>

        <Group>
          <ul className="divide-y divide-white/10">
            {MENU.map((label) => (
              <li key={label}>
                <Pressable onClick={() => onMenu(label)} className="flex w-full items-center justify-between py-[13px] text-[15px] text-white" aria-expanded={note === label}>
                  {label}
                  <span className="text-white/40">›</span>
                </Pressable>
                {note === label && NOTES[label] && <p className="pb-[12px] text-[13px] font-light leading-[1.4] text-white/60">{NOTES[label]}</p>}
              </li>
            ))}
          </ul>
        </Group>
      </div>
    </main>
  )
}

function Group({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-[10px] bg-white/[0.06] px-[14px] py-[6px]">
      {title && <h2 className="pb-[4px] pt-[8px] text-[13px] font-semibold uppercase tracking-[0.08em] text-white/50">{title}</h2>}
      {children}
    </section>
  )
}

function RowLabel({ children }: { children: ReactNode }) {
  return <div className="pb-[8px] pt-[14px] text-[13px] text-white/70">{children}</div>
}

/** A labelled switch: the knob slides on the focus spring, instantly with reduced motion. */
function SwitchRow({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  const m = useMotion()
  return (
    <Pressable role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between py-[10px] text-[15px] text-white">
      {label}
      <span className={`relative h-[28px] w-[48px] rounded-full transition-colors duration-(--motion-quick) ${on ? 'bg-accent' : 'bg-white/25'}`}>
        <motion.span
          className="absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow"
          initial={false}
          animate={{ left: on ? 23 : 3 }}
          transition={m.focus(true)}
        />
      </span>
    </Pressable>
  )
}

function Segmented<K extends string>({ options, value, onChange }: { options: { key: K; label: ReactNode }[]; value: K; onChange: (k: K) => void }) {
  return (
    <div className="flex rounded-[8px] bg-white/10 p-[3px]" role="radiogroup">
      {options.map((o) => (
        <Pressable
          key={o.key}
          role="radio"
          aria-checked={o.key === value}
          onClick={() => onChange(o.key)}
          className={`flex h-[34px] flex-1 items-center justify-center rounded-[6px] text-[14px] font-semibold transition-colors duration-(--motion-quick) ${
            o.key === value ? 'bg-white text-black' : 'text-white/70'
          }`}
        >
          {o.label}
        </Pressable>
      ))}
    </div>
  )
}
