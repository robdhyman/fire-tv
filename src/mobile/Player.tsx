import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useMotion } from '../motion/useMotion'
import { distance, duration } from '../motion/tokens'
import { CAPTION_SIZES, CAPTION_STYLES, useSettings } from '../state/settings'
import { COUNTDOWN, CREDITS_LEAD, CREW, SKIP, SPEED, TICK_MS } from '../data/playback'
import { BackButton, Pill, Pressable } from './ui'
import { artUrl, catalogue, episodeKey, episodeRef, nextEpisode, runtimeSeconds, stillFocus, stillUrl, timecode, type EpisodeRef } from '../data/catalogue'

/*
 * The Player on a phone: native-style touch controls. A tap on the picture
 * shows the chrome (back, title, captions; skip back 10 s, play/pause, skip
 * forward 10 s; a timeline you scrub by dragging); it hides itself three
 * seconds after the last touch while playing and stays while paused. In the
 * credits the 15 s Up Next card rises from the bottom. Playback is the same
 * 20x simulation as the TV Player.
 */

export function MobilePlayer() {
  const { showId = '', season = '', episode = '' } = useParams()
  const listed = catalogue.rows.upNext.find((u) => u.show === showId && u.season === Number(season) && u.episode === Number(episode))
  const ref = episodeRef(showId, Number(season), Number(episode), listed?.progress ?? 0)
  if (!ref) return <Navigate to="/" replace />
  return <Playback key={episodeKey(ref)} current={ref} />
}

function Playback({ current }: { current: EpisodeRef }) {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const m = useMotion()
  const total = runtimeSeconds(current)
  const next = nextEpisode(current)
  const [elapsed, setElapsed] = useState(Math.floor(total * current.progress))
  const [paused, setPaused] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN)
  const [chrome, setChrome] = useState(true)
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(0)
  const credits = elapsed >= total - CREDITS_LEAD

  useEffect(() => {
    if (paused || dragging) return
    const t = setInterval(() => setElapsed((e) => Math.min(total, e + (SPEED * TICK_MS) / 1000)), TICK_MS)
    return () => clearInterval(t)
  }, [total, paused, dragging])

  // Chrome hides itself after a quiet spell while playing.
  useEffect(() => {
    if (!chrome || paused || dragging) return
    const t = setTimeout(() => setChrome(false), duration.chromeHide * 1000)
    return () => clearTimeout(t)
  }, [chrome, paused, dragging, touched])

  const touch = () => {
    setChrome(true)
    setTouched((n) => n + 1)
  }

  const play = (ref: EpisodeRef) => navigate(`/play/${ref.show.id}/${ref.season.number}/${ref.episode.number}`, { replace: true })

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

  // Scrub by drag: the pointer's x along the track is the position.
  const track = useRef<HTMLDivElement>(null)
  const seek = (clientX: number) => {
    const r = track.current?.getBoundingClientRect()
    if (!r) return
    setElapsed(Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * total)
  }
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    seek(e.clientX)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) seek(e.clientX)
  }
  const onPointerUp = () => {
    setDragging(false)
    touch()
  }

  const pct = total ? elapsed / total : 0
  const captionsOn = settings.captions.on && !credits
  const style = CAPTION_STYLES[settings.captions.style]
  const stop = (fn: () => void) => (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    fn()
    touch()
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white" onClick={() => (chrome ? setChrome(false) : touch())} data-chrome={chrome || undefined}>
      {/* The picture: 16:9 letterboxed in portrait, full height in landscape. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative aspect-video w-full landscape:h-full landscape:w-auto"
          initial={false}
          animate={{ opacity: credits ? 0 : 1 }}
          transition={m.fade}
        >
          <img src={artUrl(current.show.heroArt)} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: current.show.artFocus }} />
          {captionsOn && (
            <p
              className="absolute inset-x-[8%] bottom-[8%] mx-auto w-fit max-w-full px-[8px] py-[4px] text-center leading-[1.3]"
              style={{ color: style.color, background: style.background, fontSize: CAPTION_SIZES[settings.captions.size] / 2 }}
            >
              {current.episode.synopsis}
            </p>
          )}
        </motion.div>
      </div>
      {credits && <CreditsRoll />}

      <AnimatePresence>
        {chrome && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={m.fade}
            data-player-chrome
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-x-0 top-0 flex items-start gap-[12px] px-gutter pt-[calc(env(safe-area-inset-top)+12px)]">
              <BackButton />
              <div className="min-w-0 flex-1 pt-[4px]">
                <div className="truncate text-[12px] font-light uppercase tracking-[0.08em] text-white/80">{current.show.title}</div>
                <div className="display truncate text-[22px] leading-[1] text-white">{current.episode.title}</div>
                <div className="mt-[3px] text-[12px] font-light text-white/70">
                  S{current.season.number} E{current.episode.number}
                </div>
              </div>
              <Pressable
                aria-label="captions"
                aria-pressed={settings.captions.on}
                onClick={stop(() => navigate('/tools'))}
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black/50 ${settings.captions.on ? 'text-accent' : 'text-white'}`}
              >
                <svg width="22" height="18" viewBox="0 0 52 44" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h44v28H30l-8 9v-9H4z" />
                  <path d="M12 14h18M34 14h6M12 22h6M22 22h18" />
                </svg>
              </Pressable>
            </div>

            {!credits && (
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-[36px]">
                <Round aria-label={`back ${SKIP} seconds`} onClick={stop(() => setElapsed((e) => Math.max(0, e - SKIP)))}>
                  <SkipGlyph back />
                </Round>
                <Round big aria-label={paused ? 'play' : 'pause'} onClick={stop(() => setPaused((p) => !p))}>
                  {paused ? (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
                  )}
                </Round>
                <Round aria-label={`forward ${SKIP} seconds`} onClick={stop(() => setElapsed((e) => Math.min(total, e + SKIP)))}>
                  <SkipGlyph />
                </Round>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 px-gutter pb-[calc(env(safe-area-inset-bottom)+14px)]" onClick={(e) => e.stopPropagation()}>
              <div
                ref={track}
                className="relative h-[36px] touch-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                role="slider"
                aria-label="timeline"
                aria-valuemin={0}
                aria-valuemax={Math.floor(total)}
                aria-valuenow={Math.floor(elapsed)}
                data-timeline
              >
                <div className="absolute inset-x-0 top-[16px] h-[3px] rounded-full bg-white/30">
                  <div className="h-full rounded-full bg-timeline" style={{ width: `${pct * 100}%` }} />
                </div>
                <div
                  className={`absolute top-[17px] h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform duration-(--motion-quick) ${dragging ? 'scale-150' : ''}`}
                  style={{ left: `${pct * 100}%` }}
                />
                {dragging && (
                  <div className="absolute top-[-22px] -translate-x-1/2 rounded bg-black/70 px-[6px] py-[2px] text-[12px] leading-none" style={{ left: `clamp(24px, ${pct * 100}%, calc(100% - 24px))` }}>
                    {timecode(elapsed)}
                  </div>
                )}
              </div>
              <div className="flex justify-between text-[12px] font-light leading-none text-white/85">
                <span>{timecode(elapsed)}</span>
                <span>{timecode(total)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {credits && (
          <motion.aside
            className="absolute inset-x-gutter bottom-[calc(env(safe-area-inset-bottom)+70px)] z-10 rounded-[12px] bg-[#1b1b1b] p-[12px] shadow-[0_12px_32px_rgba(0,0,0,0.6)] md:left-auto md:w-[400px]"
            initial={{ opacity: 0, y: m.reduced ? 0 : distance.cardRise }}
            animate={{ opacity: 1, y: 0, transition: { ...m.rise, opacity: m.fade } }}
            exit={{ opacity: 0, transition: m.fade }}
            onClick={(e) => e.stopPropagation()}
            data-up-next
          >
            {next ? (
              <>
                <div className="flex gap-[12px]">
                  <div className="relative aspect-video w-[40%] shrink-0 overflow-hidden rounded-[4px] bg-black/40">
                    <img src={stillUrl(next)} alt="" draggable={false} className="h-full w-full object-cover" style={{ objectPosition: stillFocus(next) }} />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white/90 bg-black/40 text-[18px] font-light">{Math.max(0, countdown)}</span>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-light text-white/60">up next in {Math.max(0, countdown)}s</div>
                    <div className="mt-[4px] truncate text-[15px] leading-[1.2]">
                      <span className="font-semibold">
                        S{next.season.number} E{next.episode.number}
                      </span>{' '}
                      {next.episode.title}
                    </div>
                    <div className="mt-[2px] text-[12px] text-white/50">{next.episode.duration} min</div>
                  </div>
                </div>
                <div className="mt-[12px] flex gap-[8px]">
                  <Pill primary className="flex-1" onClick={() => play(next)}>
                    play now
                  </Pill>
                  <Pill className="flex-1" onClick={() => navigate(`/show/${current.show.id}`, { replace: true })}>
                    back to show
                  </Pill>
                </div>
              </>
            ) : (
              <>
                <div className="text-[15px]">end of season</div>
                <div className="mt-[4px] text-[12px] font-light text-white/60">back to the show in {Math.max(0, countdown)}s</div>
                <Pill className="mt-[12px] w-full" onClick={() => navigate(`/show/${current.show.id}`, { replace: true })}>
                  back to show
                </Pill>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  )
}

function Round({ big, className = '', ...rest }: Parameters<typeof Pressable>[0] & { big?: boolean }) {
  return (
    <Pressable
      className={`flex items-center justify-center rounded-full bg-black/45 text-white backdrop-blur ${big ? 'h-[72px] w-[72px]' : 'h-[52px] w-[52px]'} ${className}`}
      {...rest}
    />
  )
}

function SkipGlyph({ back }: { back?: boolean }) {
  return (
    <span className="relative flex items-center justify-center">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ transform: back ? 'scaleX(-1)' : undefined }}>
        <path d="M12 4a8 8 0 1 1-6.5 3.3" />
        <path d="M5 3v5h5" />
      </svg>
      <span className="absolute text-[9px] font-semibold">{SKIP}</span>
    </span>
  )
}

/** Credits roll behind the Up Next card, looping. */
function CreditsRoll() {
  const lines = [...CREW, ...CREW]
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="credits-roll absolute inset-x-0 top-[25%]">
        {lines.map(([role, name], i) => (
          <div key={i} className="flex h-[48px] items-center justify-between px-gutter text-[#4a4a4a]">
            <span className="text-[13px] font-semibold">{role}</span>
            <span className="text-[14px] font-bold uppercase tracking-[0.04em]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
