import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { useSettings } from '../state/settings'
import { BackButton, MiniBadge, Pill, Pressable, TextTabs } from './ui'
import { PlayGlyph, playTarget } from './Home'
import { artUrl, episodeBadge, showById, stillFocus, stillUrl, type Show } from '../data/catalogue'

export function MobileShowDetail() {
  const { id = '' } = useParams()
  const show = showById(id)
  if (!show) return <Navigate to="/" replace />
  return <ShowPage key={show.id} show={show} />
}

/**
 * The show page on a phone: a portrait header with the page colour fading
 * up over the art, title, logline, play and +, then season tabs that stick
 * to the top while the episode list scrolls under them.
 */
function ShowPage({ show }: { show: Show }) {
  const navigate = useNavigate()
  const { inWatchlist, toggleWatchlist } = useSettings()
  const [seasonIndex, setSeasonIndex] = useState(show.seasons.length - 1)
  const season = show.seasons[seasonIndex]
  const added = inWatchlist(show.id)
  const target = playTarget(show)
  const play = (s: number, e: number) => navigate(`/play/${show.id}/${s}/${e}`)

  return (
    <main>
      <header className="relative aspect-[4/5] w-full md:aspect-[21/9]">
        <img src={artUrl(show.heroArt)} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: show.artFocus }} />
        <div className="absolute inset-0 bg-gradient-to-t from-page via-page/40 to-transparent" />
        <BackButton className="absolute left-gutter top-[calc(env(safe-area-inset-top)+12px)]" />
        <div className="absolute inset-x-0 bottom-0 px-gutter pb-[6px] md:max-w-[60%]">
          <h1 className="display text-m-title text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-m-hero-md">{show.title}</h1>
        </div>
      </header>
      <div className="px-gutter md:max-w-[60%]">
        <p className="text-[14px] font-light leading-[1.4] text-white/85 md:text-[16px]">{show.logline}</p>
        <div className="mt-[14px] flex gap-[10px]">
          <Pill primary onClick={() => play(target.season.number, target.episode.number)}>
            <PlayGlyph /> {target.resume ? `resume S${target.season.number} E${target.episode.number}` : `play S${target.season.number} E${target.episode.number}`}
          </Pill>
          <Pill onClick={() => toggleWatchlist(show.id)} aria-pressed={added}>
            {added ? '✓ in watchlist' : '+ watchlist'}
          </Pill>
        </div>
      </div>

      <div className="sticky top-0 z-10 mt-[22px] bg-page/95 pt-[calc(env(safe-area-inset-top)+10px)] backdrop-blur" data-season-tabs>
        <TextTabs
          size="md"
          tabs={show.seasons.map((s, i) => ({ key: String(i), label: `season ${s.number}` }))}
          active={String(seasonIndex)}
          onChange={(k) => setSeasonIndex(Number(k))}
        />
      </div>

      <ul className="flex flex-col md:grid md:grid-cols-2 md:gap-x-[16px]">
        {season.episodes.map((episode) => {
          const ref = { show, season, episode, progress: 0 }
          const badge = episodeBadge(ref)
          return (
            <li key={episode.number}>
              <Pressable onClick={() => play(season.number, episode.number)} className="flex w-full gap-[12px] px-gutter py-[12px]">
                <div className="relative aspect-video w-[42%] shrink-0 overflow-hidden rounded-[4px] bg-black/40 md:w-[200px]">
                  <img src={stillUrl(ref)} alt="" draggable={false} className="h-full w-full object-cover" style={{ objectPosition: stillFocus(ref) }} />
                  {badge && <MiniBadge kind={badge} />}
                  <span className="absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white">
                    <PlayGlyph />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] leading-[1.2] text-white">
                    <span className="font-semibold">E{episode.number}</span> <span className="font-normal">{episode.title}</span>
                  </div>
                  <div className="mt-[2px] text-[12px] text-white/50">{episode.duration} min</div>
                  <p className="mt-[4px] line-clamp-2 text-[12px] leading-[1.35] text-white/65">{episode.synopsis}</p>
                </div>
              </Pressable>
            </li>
          )
        })}
      </ul>
      <div className="h-[24px]" />
    </main>
  )
}
