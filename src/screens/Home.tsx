import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Nav } from '../components/Nav'
import { Hero, heroId } from '../components/Hero'
import { EpisodeLabel, Row, ROW_H_PLAIN, rowTileId, type RowItem } from '../components/Row'
import { useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import {
  artUrl,
  brandShows,
  episodeBadge,
  episodeKey,
  recentlyAddedFor,
  stillFocus,
  upNextFor,
  type Show,
} from '../data/catalogue'

const ROW_GAP = 80
/** Scroll so a focused row's label lands under the hero's tail, as in the screenshots. */
const SCROLL_TO_ROWS = 552

export function Home() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const brand = settings.brand
  const shows = useMemo(() => brandShows(brand), [brand])
  const [backdrop, setBackdrop] = useState<Show>(shows[0])
  const onCurrent = useCallback((s: Show) => setBackdrop(s), [])
  const focusedId = useFocusedId()

  useScreenFocus(`home:${brand}`, heroId(shows[0]))

  const upNext: RowItem[] = useMemo(
    () =>
      upNextFor(brand).map((ref) => ({
        id: episodeKey(ref),
        art: artUrl(ref.show.tileArt),
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

  const scroll = focusedId?.startsWith('row:upnext:')
    ? SCROLL_TO_ROWS
    : focusedId?.startsWith('row:recent:')
      ? SCROLL_TO_ROWS + ROW_H_PLAIN + 6 + ROW_GAP
      : 0

  return (
    <main className="absolute inset-0 overflow-hidden bg-rows">
      <img
        key={backdrop.id}
        src={artUrl(backdrop.heroArt)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40 brightness-[0.3]"
        style={{ objectPosition: backdrop.artFocus }}
      />
      <div
        className="absolute inset-x-0 top-0"
        style={{ transform: `translateY(${-scroll}px)`, transition: 'transform 250ms ease-out' }}
      >
        <Nav />
        <div className="pt-[130px]">
          <Hero shows={shows} onCurrent={onCurrent} />
        </div>
        <div className="mt-[58px] pl-[200px]">
          <Row id="row:upnext" label="up next" items={upNext} />
          <Row id="row:recent" label="recently added" items={recent} className="mt-[80px]" />
          <div className="h-[400px]" />
        </div>
      </div>
      {/* keep the first tile id stable for restore */}
      <span hidden>{rowTileId('row:upnext', upNext[0]?.id ?? '')}</span>
    </main>
  )
}
