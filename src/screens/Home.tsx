import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Nav } from '../components/Nav'
import { Hero, HERO_ID } from '../components/Hero'
import { EpisodeLabel, Row, ROW_H_PLAIN, type RowItem } from '../components/Row'
import { useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { useSettings, useWatch } from '../state/settings'
import { useMotion } from '../motion/useMotion'
import { stagger } from '../motion/tokens'
import {
  artUrl,
  brandShows,
  episodeBadge,
  episodeKey,
  recentlyAddedFor,
  stillFocus,
  stillArt,
  upNextFor,
  type Show,
} from '../data/catalogue'

const ROW_GAP = 80
/** Scroll so a focused row's label lands under the hero's tail, as in the screenshots. */
const SCROLL_TO_ROWS = 552

export function Home() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const { watch } = useWatch()
  const brand = settings.brand
  const m = useMotion()
  const shows = useMemo(() => brandShows(brand), [brand])
  const [backdrop, setBackdrop] = useState<Show>(shows[0])
  const onCurrent = useCallback((s: Show) => setBackdrop(s), [])
  const focusedId = useFocusedId()

  useScreenFocus(`home:${brand}`, HERO_ID)

  const upNext: RowItem[] = useMemo(
    () =>
      upNextFor(brand, watch).map((ref) => ({
        id: episodeKey(ref),
        art: artUrl(stillArt(ref)),
        artFocus: stillFocus(ref),
        badge: episodeBadge(ref),
        label: <EpisodeLabel number={ref.episode.number} title={ref.episode.title} />,
        onSelect: () => navigate(`/play/${ref.show.id}/${ref.season.number}/${ref.episode.number}`),
        episode: ref,
      })),
    [brand, watch, navigate],
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
    <main className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 bg-rows" variants={m.part}>
        <AnimatePresence initial={false}>
          <motion.img
            key={backdrop.id}
            src={artUrl(backdrop.heroArt)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.3]"
            style={{ objectPosition: backdrop.artFocus }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={m.backdropFade}
          />
        </AnimatePresence>
      </motion.div>
      <motion.div className="absolute inset-x-0 top-0" initial={false} animate={{ y: -scroll }} transition={m.scroll}>
        <Nav />
        <div className="pt-[130px]">
          <Hero shows={shows} memoryKey={brand} onCurrent={onCurrent} />
        </div>
        <motion.div className="mt-[58px] pl-[200px]" variants={m.part}>
          <Row id="row:upnext" label="up next" items={upNext} enterDelay={stagger.row} />
          <Row id="row:recent" label="recently added" items={recent} className="mt-[80px]" enterDelay={stagger.row * 2} />
          <div className="h-[400px]" />
        </motion.div>
      </motion.div>
    </main>
  )
}
