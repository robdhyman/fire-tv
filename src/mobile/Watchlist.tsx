import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useSettings } from '../state/settings'
import { EpisodeLabel, type RowItem } from '../components/Row'
import { MobileRow, ScreenHeader } from './ui'
import { allEpisodes, artUrl, episodeBadge, episodeKey, showById, stillFocus, upNextFor, type EpisodeRef, type Show } from '../data/catalogue'

/** Watchlist on a phone: Up Next, then one rail per saved show. */
export function MobileWatchlist() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const brand = settings.brand

  const toItem = (ref: EpisodeRef): RowItem => ({
    id: episodeKey(ref),
    art: artUrl(ref.show.tileArt),
    artFocus: stillFocus(ref),
    badge: episodeBadge(ref),
    label: <EpisodeLabel number={ref.episode.number} title={ref.episode.title} />,
    onSelect: () => navigate(`/play/${ref.show.id}/${ref.season.number}/${ref.episode.number}`),
  })

  const upNext = useMemo(() => upNextFor(brand).map(toItem), [brand]) // eslint-disable-line react-hooks/exhaustive-deps
  const shows = useMemo(
    () => settings.watchlist.map(showById).filter((s): s is Show => !!s && s.brand === brand),
    [settings.watchlist, brand],
  )

  return (
    <main>
      <ScreenHeader title="watchlist" />
      <div className="flex flex-col gap-[28px] pt-[6px]">
        <MobileRow label="up next" items={upNext} />
        {shows.map((show) => (
          <MobileRow key={show.id} label={show.title} items={allEpisodes(show).map(toItem)} />
        ))}
        {shows.length === 0 && (
          <p className="px-gutter text-[15px] font-light text-white/60">your watchlist is empty. tap + on a show to add it.</p>
        )}
      </div>
    </main>
  )
}
