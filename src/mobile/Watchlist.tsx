import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useSettings, useWatch } from '../state/settings'
import { EpisodeLabel, type RowItem } from '../components/Row'
import { MobileRow, ScreenHeader } from './ui'
import {
  allEpisodes,
  artUrl,
  episodeBadge,
  episodeKey,
  movieById,
  showById,
  stillArt,
  stillFocus,
  upNextFor,
  type EpisodeRef,
  type Movie,
  type Show,
} from '../data/catalogue'

/** Watchlist on a phone: Up Next, then one rail per saved show, then the saved movies in a `coming soon` rail. */
export function MobileWatchlist() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const { watch } = useWatch()
  const brand = settings.brand

  const toItem = (ref: EpisodeRef): RowItem => ({
    id: episodeKey(ref),
    art: artUrl(stillArt(ref)),
    artFocus: stillFocus(ref),
    badge: episodeBadge(ref),
    label: <EpisodeLabel number={ref.episode.number} title={ref.episode.title} />,
    onSelect: () => navigate(`/play/${ref.show.id}/${ref.season.number}/${ref.episode.number}`),
    episode: ref,
  })

  const upNext = useMemo(() => upNextFor(brand, watch).map(toItem), [brand, watch]) // eslint-disable-line react-hooks/exhaustive-deps
  const shows = useMemo(
    () => settings.watchlist.map(showById).filter((s): s is Show => !!s && s.brand === brand),
    [settings.watchlist, brand],
  )
  const movies: RowItem[] = useMemo(
    () =>
      settings.watchlist
        .map(movieById)
        .filter((m): m is Movie => !!m && m.brand === brand)
        .map((movie) => ({
          id: movie.id,
          art: artUrl(movie.posterArt),
          badge: 'coming soon',
          onSelect: () => navigate(`/movie/${movie.id}`),
        })),
    [settings.watchlist, brand, navigate],
  )

  return (
    <main>
      <ScreenHeader title="watchlist" />
      <div className="flex flex-col gap-[28px] pt-[6px]">
        <MobileRow label="up next" items={upNext} />
        {shows.map((show) => (
          <MobileRow key={show.id} label={show.title} items={allEpisodes(show, watch).map(toItem)} />
        ))}
        <MobileRow label="coming soon" items={movies} poster />
        {shows.length === 0 && movies.length === 0 && (
          <p className="px-gutter text-[15px] font-light text-white/60">your watchlist is empty. tap + on a show to add it.</p>
        )}
      </div>
    </main>
  )
}
