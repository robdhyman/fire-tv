import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import { Nav } from '../components/Nav'
import { EpisodeLabel, Row, ROW_H_PLAIN, type RowItem } from '../components/Row'
import { useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { useSettings, useWatch } from '../state/settings'
import { useMotion } from '../motion/useMotion'
import { stagger } from '../motion/tokens'
import {
  allEpisodes,
  artUrl,
  episodeBadge,
  episodeKey,
  movieById,
  showById,
  stillFocus,
  stillArt,
  upNextFor,
  type EpisodeRef,
  type Movie,
  type Show,
} from '../data/catalogue'

const ROW_GAP = 85
const ROW_PITCH = ROW_H_PLAIN + 6 + ROW_GAP

export function Watchlist() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const { watch } = useWatch()
  const brand = settings.brand
  const focusedId = useFocusedId()
  const m = useMotion()

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
  // A show removed with a tile overlay's `add` keeps its row (its + back to a +) until the screen is left,
  // so focus never sits on a row that vanished and a second press puts it back.
  const [listed, setListed] = useState(settings.watchlist)
  useEffect(() => {
    setListed((prev) => [...prev, ...settings.watchlist.filter((id) => !prev.includes(id))])
  }, [settings.watchlist])
  const shows = useMemo(
    () => listed.map(showById).filter((s): s is Show => !!s && s.brand === brand),
    [listed, brand],
  )
  // Added movies: one poster tile each in a closing `coming soon` row, with nothing in Up Next.
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

  useScreenFocus(`watchlist:${brand}`, 'nav:watchlist')

  const rowIndex = focusedId?.startsWith('row:show:')
    ? shows.findIndex((s) => focusedId.startsWith(`row:show:${s.id}:`)) + 1
    : focusedId?.startsWith('row:coming:')
      ? shows.length + 1
      : 0
  const scroll = Math.max(0, rowIndex - 1) * ROW_PITCH

  return (
    <main className="absolute inset-0 overflow-hidden bg-page">
      <Nav active="watchlist" />
      <motion.div className="absolute left-[200px] top-[163px]" initial={false} animate={{ y: -scroll }} transition={m.scroll}>
        <Row
          id="row:upnext"
          label="up next"
          items={upNext}
          aside={
            <span className="flex items-center gap-[10px] text-[23px] font-light leading-none text-white/90">
              press
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-white/80 text-[20px]">
                ≡
              </span>
              to manage your watchlist
            </span>
          }
        />
        {shows.map((show, i) => (
          <Row
            key={show.id}
            id={`row:show:${show.id}`}
            label={show.title}
            items={allEpisodes(show, watch).map(toItem)}
            className="mt-[85px]"
            enterDelay={stagger.row * (i + 1)}
          />
        ))}
        {movies.length > 0 && (
          <Row
            id="row:coming"
            label="coming soon"
            items={movies}
            poster
            className="mt-[85px]"
            enterDelay={stagger.row * (shows.length + 1)}
          />
        )}
        {shows.length === 0 && movies.length === 0 && (
          <p className="mt-[85px] text-[25px] font-light text-white/60">
            your watchlist is empty. press + on a show to add it.
          </p>
        )}
        <div className="h-[400px]" />
      </motion.div>
    </main>
  )
}
