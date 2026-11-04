import { useMemo } from 'react'
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
  showById,
  stillFocus,
  stillArt,
  upNextFor,
  type EpisodeRef,
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
  })

  const upNext = useMemo(() => upNextFor(brand, watch).map(toItem), [brand, watch]) // eslint-disable-line react-hooks/exhaustive-deps
  const shows = useMemo(
    () => settings.watchlist.map(showById).filter((s): s is Show => !!s && s.brand === brand),
    [settings.watchlist, brand],
  )

  useScreenFocus(`watchlist:${brand}`, 'nav:watchlist')

  const rowIndex = focusedId?.startsWith('row:show:')
    ? shows.findIndex((s) => focusedId.startsWith(`row:show:${s.id}:`)) + 1
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
        {shows.length === 0 && (
          <p className="mt-[85px] text-[25px] font-light text-white/60">
            your watchlist is empty. press + on a show to add it.
          </p>
        )}
        <div className="h-[400px]" />
      </motion.div>
    </main>
  )
}
