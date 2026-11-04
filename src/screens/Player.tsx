import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'
import { EpisodeLabel, Row, rowTileId, type RowItem } from '../components/Row'
import { useFocusable, useFocusContext, useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { CAPTION_SIZES, CAPTION_STYLES, useSettings } from '../state/settings'
import {
  artUrl,
  catalogue,
  episodeBadge,
  episodeKey,
  episodeRef,
  nextEpisode,
  runtimeSeconds,
  stillFocus,
  stillArt,
  timecode,
  upNextFor,
  type EpisodeRef,
} from '../data/catalogue'

import { COUNTDOWN, CREDITS_LEAD, CREW, SCRUB, SPEED, TICK_MS } from '../data/playback'

export function Player() {
  const { showId = '', season = '', episode = '' } = useParams()
  const listed = catalogue.rows.upNext.find(
    (u) => u.show === showId && u.season === Number(season) && u.episode === Number(episode),
  )
  const ref = episodeRef(showId, Number(season), Number(episode), listed?.progress ?? 0)
  if (!ref) return <Navigate to="/" replace />
  return <Playback key={episodeKey(ref)} current={ref} />
}

function Playback({ current }: { current: EpisodeRef }) {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const { setFocus } = useFocusContext()
  const total = runtimeSeconds(current)
  const next = nextEpisode(current)
  const m = useMotion()
  const [elapsed, setElapsed] = useState(Math.floor(total * current.progress))
  const [paused, setPaused] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN)
  const credits = elapsed >= total - CREDITS_LEAD
  const nextId = next ? rowTileId('credits', String(next.episode.number)) : null
  const enteredCredits = useRef(false)

  useScreenFocus(`play:${episodeKey(current)}`, 'player:timeline')

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setElapsed((e) => Math.min(total, e + (SPEED * TICK_MS) / 1000)), TICK_MS)
    return () => clearInterval(t)
  }, [total, paused])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'MediaPlayPause' || e.key === ' ') setPaused((p) => !p)
      else if (e.key === 'MediaRewind') setElapsed((v) => Math.max(0, v - SCRUB))
      else if (e.key === 'MediaFastForward') setElapsed((v) => Math.min(total, v + SCRUB))
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  useEffect(() => {
    if (!credits || enteredCredits.current) return
    enteredCredits.current = true
    if (nextId) setFocus(nextId)
  }, [credits, nextId, setFocus])

  const play = (ref: EpisodeRef) =>
    navigate(`/play/${ref.show.id}/${ref.season.number}/${ref.episode.number}`, { replace: true })

  useEffect(() => {
    if (!credits) return
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [credits])
  useEffect(() => {
    if (credits && countdown <= 0) {
      if (next) play(next)
      else navigate(`/show/${current.show.id}`, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, credits])

  const timeline = useFocusable('player:timeline', {
    onKey: (key) => {
      if (key === 'ArrowLeft') setElapsed((e) => Math.max(0, e - SCRUB))
      else if (key === 'ArrowRight') setElapsed((e) => Math.min(total, e + SCRUB))
      else return false
      return true
    },
  })
  const captionsOn = settings.captions.on
  const captionsBtn = useFocusable('player:captions', {
    onSelect: () => navigate('/tools'),
  })

  const episodes: RowItem[] = useMemo(
    () =>
      current.season.episodes.map((episode) => {
        const ref = { ...current, episode, progress: 0 }
        const isNext = next?.episode === episode && next.season === current.season
        return {
          id: String(episode.number),
          art: artUrl(stillArt(ref)),
          artFocus: stillFocus(ref),
          badge: episodeBadge(ref),
          label: <EpisodeLabel season={current.season.number} number={episode.number} title={episode.title} />,
          onSelect: () => play(ref),
          overlay: isNext ? <CountdownRing value={countdown} /> : undefined,
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, next, countdown],
  )

  const upNext: RowItem[] = useMemo(
    () =>
      upNextFor(settings.brand)
        .filter((r) => episodeKey(r) !== episodeKey(current))
        .map((r) => ({
          id: episodeKey(r),
          art: artUrl(stillArt(r)),
          artFocus: stillFocus(r),
          badge: episodeBadge(r),
          label: <EpisodeLabel season={r.season.number} number={r.episode.number} title={r.episode.title} />,
          onSelect: () => play(r),
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings.brand, current],
  )

  const pct = total ? elapsed / total : 0
  const style = CAPTION_STYLES[settings.captions.style]
  // The up next row peeks at the bottom; focusing it lifts the overlay so the opened row fits on screen.
  const focusedId = useFocusedId()
  const browsing = focusedId?.startsWith('row:upnext:') ?? false
  const top = credits
    ? browsing
      ? { title: 100, episode: 236, timeline: 236, credits: 316, upNext: 690, episodeOpacity: 0 }
      : { title: 100, episode: 236, timeline: 266, credits: 497, upNext: 940, episodeOpacity: 1 }
    : browsing
      ? { title: 210, episode: 480, timeline: 560, credits: 497, upNext: 650, episodeOpacity: 1 }
      : { title: 210, episode: 640, timeline: 724, credits: 497, upNext: 905, episodeOpacity: 1 }

  // Every layout shift on the Player is an up/down move: the `scroll` spring.
  const shift = (y: number) => ({ initial: false as const, animate: { top: y }, transition: m.scroll })

  return (
    <main className="absolute inset-0 overflow-hidden bg-black">
      <motion.img
        src={artUrl(current.show.heroArt)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
        style={{ objectPosition: current.show.artFocus }}
        initial={false}
        animate={{ opacity: credits ? 0 : 1 }}
        transition={m.fade}
      />
      {credits && <CreditsRoll />}

      <AnimatePresence>
        {paused && (
          <motion.div
            className="absolute left-1/2 top-[440px] flex h-[120px] w-[120px] -translate-x-1/2 items-center justify-center rounded-full bg-black/50 text-[56px] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={m.fade}
          >
            ❚❚
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="absolute left-[200px]" {...shift(top.title)}>
        <div className="text-[30px] font-light uppercase leading-none tracking-[0.04em] text-white">{current.show.title}</div>
        <div className="display mt-[14px] text-title text-white">{current.episode.title}</div>
      </motion.div>
      <motion.div
        className="absolute left-[200px] text-[27px] font-light leading-none text-white"
        initial={false}
        animate={{ top: top.episode, opacity: top.episodeOpacity }}
        transition={{ default: m.scroll, opacity: m.fade }}
      >
        S{current.season.number} E{current.episode.number}
      </motion.div>

      {/* Timeline: thin line in five segments, elapsed above the marker, total below at the right. */}
      <motion.div {...timeline.props} className="absolute inset-x-0 h-[70px]" {...shift(top.timeline)}>
        <div className="absolute inset-x-0 top-[32px] flex h-[3px] gap-[12px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-full flex-1 bg-timeline" />
          ))}
        </div>
        <div
          className={`absolute top-[24px] h-[20px] w-[3px] bg-white transition-[left] duration-(--motion-quick) ${timeline.focused ? 'shadow-[0_0_0_2px_#fff]' : ''}`}
          style={{ left: pct * 1920 - 1 }}
        />
        <div
          className="absolute top-[-10px] w-[120px] -translate-x-1/2 text-center text-[27px] font-light leading-none text-white"
          style={{ left: Math.min(Math.max(pct * 1920, 60), 1860) }}
        >
          {timecode(elapsed)}
        </div>
        <div className="absolute right-[103px] top-[46px] text-[27px] font-light leading-none text-white">{timecode(total)}</div>
      </motion.div>

      {!credits && (
        <div
          {...captionsBtn.props}
          className={`absolute left-[934px] top-[824px] flex h-[52px] w-[52px] items-center justify-center transition-transform duration-(--motion-quick) ${
            captionsBtn.focused ? 'scale-125' : ''
          }`}
          title="captions"
        >
          <CaptionsIcon on={captionsOn} focused={captionsBtn.focused} />
        </div>
      )}

      {captionsOn && !credits && (
        <p
          className="absolute left-1/2 top-[560px] max-w-[1200px] -translate-x-1/2 px-[16px] py-[8px] text-center leading-[1.3]"
          style={{ color: style.color, background: style.background, fontSize: CAPTION_SIZES[settings.captions.size] }}
        >
          {current.episode.synopsis}
        </p>
      )}

      {credits && (
        <motion.div className="absolute left-[200px]" {...shift(top.credits)}>
          <Row
            id="credits"
            label={next ? <EpisodeLabel season={next.season.number} number={next.episode.number} title={next.episode.title} /> : 'end of season'}
            items={episodes}
            mode="big"
            initialIndex={next ? current.season.episodes.indexOf(next.episode) : 0}
          />
        </motion.div>
      )}

      <motion.div className="absolute left-[200px]" {...shift(top.upNext)}>
        <Row id="row:upnext" label="up next" items={upNext} />
      </motion.div>
    </main>
  )
}

function CountdownRing({ value }: { value: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-[246px] w-[246px] items-center justify-center rounded-full border-[3px] border-white/90 text-[110px] font-light leading-none text-white">
        {Math.max(0, value)}
      </div>
    </div>
  )
}

function CaptionsIcon({ on, focused }: { on: boolean; focused: boolean }) {
  const stroke = focused ? '#fff' : on ? 'var(--color-accent)' : '#fff'
  return (
    <svg width="52" height="44" viewBox="0 0 52 44" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 4h44v28H30l-8 9v-9H4z" strokeLinejoin="round" fill={on ? 'rgba(255,255,255,0.15)' : 'none'} />
      <path d="M12 14h18M34 14h6M12 22h6M22 22h18" />
    </svg>
  )
}

/** Two-column credits roll behind the Up Next card, looping. */
function CreditsRoll() {
  const lines = [...CREW, ...CREW]
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="credits-roll absolute inset-x-0 top-[120px]">
        {lines.map(([role, name], i) => (
          <div key={i} className="flex h-[130px] items-center justify-between px-[200px] text-[#4a4a4a]">
            <span className="text-[44px] font-semibold">{role}</span>
            <span className="text-[52px] font-bold uppercase tracking-[0.04em]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
