import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { EpisodeLabel, Row, type RowItem } from '../components/Row'
import { RoundButton } from '../components/RoundButton'
import { useFocusable, useScreenFocus } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { artUrl, episodeBadge, showById, stillFocus, type Season, type Show } from '../data/catalogue'

const TAB_PITCH = 132

function SeasonTab({ show, season, active, onSelect }: { show: Show; season: Season; active: boolean; onSelect: () => void }) {
  const { focused, props } = useFocusable(`season:${show.id}:${season.number}`, { onSelect })
  return (
    <div
      {...props}
      className={`shrink-0 text-[25px] leading-none transition-colors ${active ? 'font-semibold text-white' : 'font-normal text-white/70'} ${
        focused ? 'underline decoration-accent decoration-[3px] underline-offset-[8px]' : ''
      }`}
      style={{ width: TAB_PITCH }}
    >
      season {season.number}
    </div>
  )
}

export function ShowDetail() {
  const { id = '' } = useParams()
  const show = showById(id)
  if (!show) return <Navigate to="/" replace />
  return <ShowPage show={show} />
}

function ShowPage({ show }: { show: Show }) {
  const navigate = useNavigate()
  const { inWatchlist, toggleWatchlist } = useSettings()
  const [seasonIndex, setSeasonIndex] = useState(show.seasons.length - 1)
  const season = show.seasons[seasonIndex]
  const added = inWatchlist(show.id)

  useScreenFocus(`show:${show.id}`, `episodes:${show.id}:${season.number}:${season.episodes[0].number}`)

  const items: RowItem[] = useMemo(
    () =>
      season.episodes.map((episode) => {
        const ref = { show, season, episode, progress: 0 }
        return {
          id: String(episode.number),
          art: artUrl(show.tileArt),
          artFocus: stillFocus(ref),
          badge: episodeBadge(ref),
          label: <EpisodeLabel number={episode.number} title={episode.title} />,
          onSelect: () => navigate(`/play/${show.id}/${season.number}/${episode.number}`),
        }
      }),
    [show, season, navigate],
  )

  const tabs = (
    <div
      className="flex items-end"
      style={{ transform: `translateX(${-seasonIndex * TAB_PITCH}px)`, transition: 'transform 200ms ease-out' }}
    >
      {show.seasons.map((s, i) => (
        <SeasonTab key={s.number} show={show} season={s} active={i === seasonIndex} onSelect={() => setSeasonIndex(i)} />
      ))}
    </div>
  )

  return (
    <main className="absolute inset-0 overflow-hidden bg-page">
      <img
        src={artUrl(show.heroArt)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: show.artFocus }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute left-[200px] top-[268px] max-w-[620px]">
        <h1 className="display text-title text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{show.title}</h1>
        <p className="mt-[20px] text-[25px] font-light leading-[1.3] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          {show.logline}
        </p>
      </div>

      <div className="absolute left-[200px] top-[536px]">
        <RoundButton
          id={`show:${show.id}:add`}
          onSelect={() => toggleWatchlist(show.id)}
          label={added ? 'in your watchlist' : 'add to watchlist'}
        >
          {added ? '✓' : '+'}
        </RoundButton>
      </div>

      <div className="absolute left-[200px] top-[645px]">
        <Row id={`episodes:${show.id}:${season.number}`} label={tabs} items={items} mode="big" />
      </div>
    </main>
  )
}
