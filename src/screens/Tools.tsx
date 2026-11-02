import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Nav } from '../components/Nav'
import { useFocusable, useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { CAPTION_SIZES, CAPTION_STYLES, useSettings } from '../state/settings'

const MENU = ['language options', 'sign out', 'reload', 'about', 'terms', 'FAQs', 'contact'] as const
const NOTES: Record<string, string> = {
  'language options': 'English is the only interface language in this demo.',
  about: 'A rebuild of the 2017 NBCU Fire TV prototype. Placeholder art stands in for show IP.',
  terms: 'Portfolio demo. No account, no playback, nothing collected.',
  FAQs: 'Arrow keys move, Enter selects, Esc goes back. Switch the brand under “brand”.',
  contact: 'rob hyman · portfolio case study',
}

function MenuItem({ label, onSelect }: { label: string; onSelect: () => void }) {
  const { focused, props } = useFocusable(`tools:menu:${label}`, { onSelect })
  return (
    <div
      {...props}
      className={`text-[25px] leading-none ${focused ? 'text-accent underline decoration-[3px] underline-offset-[8px]' : 'text-white'}`}
    >
      {label}
    </div>
  )
}

/** One choice in a group: bold when selected, accent-underlined when focused. */
function Choice({ id, selected, onSelect, children, className = '' }: { id: string; selected: boolean; onSelect: () => void; children: ReactNode; className?: string }) {
  const { focused, props } = useFocusable(id, { onSelect })
  return (
    <div
      {...props}
      className={`leading-none transition-colors ${selected ? 'font-semibold text-white' : 'font-normal text-white/60'} ${
        focused ? 'text-accent underline decoration-[3px] underline-offset-[8px]' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

function OnOff({ prefix, on, onChange }: { prefix: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="mt-[22px] flex items-baseline gap-[10px] text-[30px]">
      <Choice id={`${prefix}:on`} selected={on} onSelect={() => onChange(true)}>on</Choice>
      <span className="text-white/60">/</span>
      <Choice id={`${prefix}:off`} selected={!on} onSelect={() => onChange(false)}>off</Choice>
    </div>
  )
}

function Section({ title, prefix, children }: { title: string; prefix: string; children: ReactNode }) {
  const focusedId = useFocusedId()
  const within = focusedId?.startsWith(prefix) ?? false
  return (
    <section className={`transition-opacity duration-200 ${within ? 'opacity-100' : 'opacity-50'}`}>
      <h2 className="text-[38px] font-light leading-none text-white">{title}</h2>
      {children}
    </section>
  )
}

export function Tools() {
  const navigate = useNavigate()
  const { settings, update } = useSettings()
  const [note, setNote] = useState<string | null>(null)
  const { captions, audio, brand } = settings
  useScreenFocus('tools', captions.on ? 'cap:on' : 'cap:off')

  const onMenu = (label: string) => {
    if (label === 'reload') window.location.reload()
    else if (label === 'sign out') {
      localStorage.clear()
      navigate('/')
    } else setNote(NOTES[label] ?? null)
  }

  const style = CAPTION_STYLES[captions.style]

  return (
    <main className="absolute inset-0 overflow-hidden bg-page">
      <Nav active="tools" />
      <div className="absolute left-[200px] top-[181px] flex gap-[66px]">
        {MENU.map((m) => (
          <MenuItem key={m} label={m} onSelect={() => onMenu(m)} />
        ))}
      </div>
      {note && <p className="absolute left-[200px] top-[228px] text-[23px] font-light text-white/60">{note}</p>}

      <div className="absolute left-[200px] top-[284px]">
        <Section title="captions" prefix="cap:">
          <OnOff prefix="cap" on={captions.on} onChange={(on) => update({ captions: { ...captions, on } })} />
          <div className={`transition-opacity duration-200 ${captions.on ? 'opacity-100' : 'opacity-45'}`}>
            <h3 className="mt-[56px] text-[27px] font-light leading-none text-white/80">Font size</h3>
            <div className="mt-[22px] flex items-baseline gap-[30px]">
              {CAPTION_SIZES.map((px, i) => (
                <Choice
                  key={px}
                  id={`cap:size:${i}`}
                  selected={captions.size === i}
                  onSelect={() => update({ captions: { ...captions, size: i } })}
                  className={`${captions.size === i ? 'border-b-2 border-white' : ''} pb-[12px]`}
                >
                  <span style={{ fontSize: [30, 38, 46][i] }}>Aa</span>
                </Choice>
              ))}
            </div>
            <h3 className="mt-[56px] text-[27px] font-light leading-none text-white/80">Font color &amp; background</h3>
            <div className="mt-[18px] flex gap-[8px]">
              {CAPTION_STYLES.map((s, i) => (
                <Choice
                  key={i}
                  id={`cap:style:${i}`}
                  selected={captions.style === i}
                  onSelect={() => update({ captions: { ...captions, style: i } })}
                  className={`flex h-[70px] w-[70px] items-center justify-center text-[30px] ${captions.style === i ? 'border-b-2 border-white' : ''}`}
                >
                  <span className="flex h-full w-full items-center justify-center" style={{ color: s.color, background: s.background }}>
                    Aa
                  </span>
                </Choice>
              ))}
            </div>
            <p
              className="mt-[46px] inline-block px-[14px] py-[6px] leading-none"
              style={{ color: style.color, background: style.background, fontSize: CAPTION_SIZES[captions.size] }}
            >
              this is a sample caption
            </p>
          </div>
        </Section>
      </div>

      <div className="absolute left-[765px] top-[284px]">
        <Section title="audio description" prefix="ad:">
          <OnOff prefix="ad" on={audio.on} onChange={(on) => update({ audio: { ...audio, on } })} />
          <div className="mt-[56px] flex flex-col gap-[34px] text-[27px]">
            <Choice id="ad:en" selected={audio.lang === 'en'} onSelect={() => update({ audio: { ...audio, lang: 'en' } })}>English</Choice>
            <Choice id="ad:es" selected={audio.lang === 'es'} onSelect={() => update({ audio: { ...audio, lang: 'es' } })}>Spanish</Choice>
          </div>
        </Section>
      </div>

      <div className="absolute left-[1330px] top-[284px]">
        <Section title="brand" prefix="brand:">
          <div className="mt-[22px] flex items-baseline gap-[10px] text-[30px]">
            <Choice id="brand:syfy" selected={brand === 'syfy'} onSelect={() => update({ brand: 'syfy' })}>SYFY</Choice>
            <span className="text-white/60">/</span>
            <Choice id="brand:usa" selected={brand === 'usa'} onSelect={() => update({ brand: 'usa' })}>USA</Choice>
          </div>
          <p className="mt-[56px] max-w-[380px] text-[23px] font-light leading-[1.3] text-white/70">
            Swaps the logo, accent and display face. The catalogue follows the brand.
          </p>
        </Section>
      </div>
    </main>
  )
}
