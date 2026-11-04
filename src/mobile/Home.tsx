import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSettings } from '../state/settings'
import { EpisodeLabel, type RowItem } from '../components/Row'
import { Logo } from '../components/Logo'
import { MobileRow, Pill, Pressable } from './ui'
import {
  artUrl,
  brandShows,
  catalogue,
  episodeBadge,
  episodeKey,
  recentlyAddedFor,
  stillFocus,
  stillUrl,
  upNextFor,
  type Show,
} from '../data/catalogue'

/** Home on a phone: a swipeable portrait hero, then the rows as rails. */
export function MobileHome() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const brand = settings.brand
  const shows = useMemo(() => brandShows(brand), [brand])

  const upNext: RowItem[] = useMemo(
    () =>
      upNextFor(brand).map((ref) => ({
        id: episodeKey(ref),
        art: stillUrl(ref),
        artFocus: stillFocus(ref),
        badge: episodeBadge(ref),
        label: <EpisodeLabel number={ref.episode.number} title={ref.episode.title} />,
        onSelect: () => navigate(`/play/${ref.show.id}/${ref.season.number}/${ref.episode.number}`),
      })),
    [brand, navigate],
  )

  const recent: RowItem[] = useMemo(
    () =>
      recentlyAddedFor(brand).map((show) => ({
        id: show.id,
        art: artUrl(show.tileArt),
        artFocus: show.artFocus,
        badge: show.new ? 'new' : show.expiring ? 'expiring' : undefined,
        label: show.title,
        onSelect: () => navigate(`/show/${show.id}`),
      })),
    [brand, navigate],
  )

  return (
    <main>
      <MobileHero shows={shows} />
      <div className="mt-[24px] flex flex-col gap-[28px]">
        <MobileRow label="up next" items={upNext} />
        <MobileRow label="recently added" items={recent} />
      </div>
    </main>
  )
}

/** First episode to play for a show: where Up Next left off, else S1 E1. */
export function playTarget(show: Show) {
  const listed = catalogue.rows.upNext.find((u) => u.show === show.id)
  const season = listed ? show.seasons.find((s) => s.number === listed.season) ?? show.seasons[0] : show.seasons[0]
  const episode = listed ? season.episodes.find((e) => e.number === listed.episode) ?? season.episodes[0] : season.episodes[0]
  return { season, episode, resume: !!listed && listed.progress > 0 }
}

/**
 * The hero as a strip of full-width panels with scroll-snap: a swipe moves
 * one show, dots show where you are. Portrait crop on a phone (3:4 with the
 * page colour fading up from the bottom), 16:9 on a tablet. Tapping the art
 * opens the show; play and + sit under the logline as on the show page.
 */
function MobileHero({ shows }: { shows: Show[] }) {
  const navigate = useNavigate()
  const { settings, inWatchlist, toggleWatchlist } = useSettings()
  const [current, setCurrent] = useState(0)
  const track = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const el = track.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== current) setCurrent(Math.max(0, Math.min(shows.length - 1, i)))
  }

  return (
    <section className="relative">
      <div ref={track} onScroll={onScroll} className="rail flex snap-x snap-mandatory overflow-x-auto" data-hero-strip>
        {shows.map((show, i) => {
          const target = playTarget(show)
          const added = inWatchlist(show.id)
          return (
            <div
              key={show.id}
              data-hero-panel={show.id}
              data-hero-current={i === current || undefined}
              className="relative aspect-[3/4] w-full shrink-0 snap-start md:aspect-video"
              onClick={() => navigate(`/show/${show.id}`)}
            >
              <img
                src={artUrl(show.heroArt)}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: show.artFocus }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-page via-page/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-gutter pb-[28px] md:max-w-[60%] md:pb-[36px]">
                <h1 className="display text-m-hero text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-m-hero-md">{show.title}</h1>
                <p className="mt-[8px] line-clamp-3 text-[14px] font-light leading-[1.35] text-white/85 md:text-[16px]">{show.logline}</p>
                <div className="mt-[14px] flex gap-[10px]">
                  <Pill
                    primary
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/play/${show.id}/${target.season.number}/${target.episode.number}`)
                    }}
                  >
                    <PlayGlyph /> {target.resume ? `resume S${target.season.number} E${target.episode.number}` : 'play'}
                  </Pill>
                  <Pill
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWatchlist(show.id)
                    }}
                    aria-pressed={added}
                  >
                    {added ? '✓ in watchlist' : '+ watchlist'}
                  </Pill>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="pointer-events-none absolute left-gutter top-[calc(env(safe-area-inset-top)+14px)] origin-left" style={{ transform: 'scale(0.8)' }}>
        <Logo brand={settings.brand} />
      </div>
      <ol className="pointer-events-none absolute inset-x-0 bottom-[10px] flex justify-center gap-[6px]" aria-hidden>
        {shows.map((s, i) => (
          <li key={s.id} className={`h-[5px] rounded-full transition-all duration-(--motion-quick) ${i === current ? 'w-[18px] bg-accent' : 'w-[5px] bg-white/40'}`} />
        ))}
      </ol>
      <Pressable className="sr-only" onClick={() => navigate(`/show/${shows[current].id}`)}>
        open {shows[current].title}
      </Pressable>
    </section>
  )
}

export const PlayGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
    <path d="M2 1.5v9l8-4.5z" />
  </svg>
)
