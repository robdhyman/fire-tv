import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useNavigationType, useParams } from 'react-router'
import { motion, useIsPresent } from 'motion/react'
import { Nav } from '../components/Nav'
import { EpisodeLabel, Row, type RowItem } from '../components/Row'
import { RoundButton } from '../components/RoundButton'
import { useFocusable, useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { FULL_CLIP, fromHeroPanel, morph, useFlight, useMotion } from '../motion/useMotion'
import { distance, duration } from '../motion/tokens'
import { artUrl, episodeBadge, showById, stillArt, stillFocus, type Season, type Show } from '../data/catalogue'

const TAB_PITCH = 132

function SeasonTab({ show, season, active, onSelect }: { show: Show; season: Season; active: boolean; onSelect: () => void }) {
  const { focused, props } = useFocusable(`season:${show.id}:${season.number}`, { onSelect })
  return (
    <div
      {...props}
      className={`shrink-0 text-[25px] leading-none transition-colors duration-(--motion-quick) ${active ? 'font-semibold text-white' : 'font-normal text-white/70'} ${
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
  const m = useMotion()
  // Entered from Home's hero: the art opens out of the hero rectangle and the title flies in.
  const [viaHero] = useState(() => {
    const via = morph.hero?.showId === show.id && morph.prevPath === '/'
    if (!via && morph.prevPath === '/') morph.hero = null
    return via
  })
  const [morphIn, setMorphIn] = useState(viaHero)
  // The art starts where the hero panel was, even if Enter landed mid-slide.
  const [from] = useState(() => fromHeroPanel(viaHero ? (morph.hero?.panel ?? null) : null))
  const later = { delay: m.reduced ? 0 : duration.riseDelay }
  const afterFlight = { delay: m.reduced || !viaHero ? later.delay : duration.copyAfterFlight }
  // The title flies in from the hero's title; its resting box is kept for the flight back.
  const title = useFlight<HTMLHeadingElement>(viaHero ? (morph.hero?.title ?? null) : null, m.morph, (rest) => {
    morph.showTitle = rest
  })
  const { inWatchlist, toggleWatchlist } = useSettings()
  const [seasonIndex, setSeasonIndex] = useState(show.seasons.length - 1)
  const season = show.seasons[seasonIndex]
  const added = inWatchlist(show.id)

  // Arriving (Home's hero, the Shows grid, Search, a tile's info) lands on the +; coming back from the Player restores the last focus.
  const returning = useNavigationType() !== 'PUSH'
  useScreenFocus(`show:${show.id}`, `show:${show.id}:add`, returning)

  // The nav is shown while focus is on the + (or in the nav) and hidden while it is below, on the season tabs or episodes.
  // Once the page starts leaving, the nav stays as it was.
  const focusedId = useFocusedId()
  const present = useIsPresent()
  const below = !!focusedId && (focusedId.startsWith(`season:${show.id}:`) || focusedId.startsWith(`episodes:${show.id}:`))
  const [navShown, setNavShown] = useState(true)
  useEffect(() => {
    if (present) setNavShown(!below)
  }, [present, below])

  const items: RowItem[] = useMemo(
    () =>
      season.episodes.map((episode) => {
        const ref = { show, season, episode, progress: 0 }
        return {
          id: String(episode.number),
          art: artUrl(stillArt(ref)),
          artFocus: stillFocus(ref),
          badge: episodeBadge(ref),
          label: <EpisodeLabel number={episode.number} title={episode.title} />,
          onSelect: () => navigate(`/play/${show.id}/${season.number}/${episode.number}`),
        }
      }),
    [show, season, navigate],
  )

  // Tabs sit in a fixed line from x=200 and never slide: selecting a season changes weight only.
  const tabs = (
    <div className="flex items-end">
      {show.seasons.map((s, i) => (
        <SeasonTab key={s.number} show={show} season={s} active={i === seasonIndex} onSelect={() => setSeasonIndex(i)} />
      ))}
    </div>
  )

  return (
    <main className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 bg-page" variants={m.part} />
      <motion.div
        className="absolute inset-0"
        variants={morphIn ? { hidden: { opacity: 1 }, shown: { opacity: 1 } } : m.part}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: viaHero ? from.clip : FULL_CLIP }}
          animate={{ clipPath: FULL_CLIP }}
          transition={m.morph}
          onAnimationComplete={() => setMorphIn(false)}
        >
          <motion.img
            src={artUrl(show.heroArt)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: show.artFocus, originX: 0, originY: 0 }}
            initial={viaHero && !m.reduced ? { scale: from.scale, x: from.x, y: from.y } : false}
            animate={{ scale: 1, x: 0, y: 0 }}
            transition={m.morph}
          />
        </motion.div>
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" variants={m.part} />
      <motion.div className="absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-t from-black/60 to-transparent" variants={m.part} />
      {/* Labels of its own, so the nav ignores the screen's hidden/shown: it holds through the morph and Back and fades only with focus. */}
      <motion.div
        variants={{ navHidden: { opacity: 0 }, navShown: { opacity: 1 } }}
        initial={viaHero ? false : 'navHidden'}
        animate={navShown ? 'navShown' : 'navHidden'}
        transition={m.quick}
      >
        <Nav />
      </motion.div>

      <div className="absolute left-[200px] top-[268px] max-w-[620px]">
        <motion.h1
          ref={title.ref}
          style={title.style}
          variants={viaHero ? undefined : m.part}
          className="display text-title text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
        >
          {show.title}
        </motion.h1>
        <motion.p
          variants={{ hidden: m.part.hidden, shown: { ...m.part.shown, transition: { ...m.fade, ...afterFlight } } }}
          className="mt-[20px] text-[25px] font-light leading-[1.3] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
        >
          {show.logline}
        </motion.p>
      </div>

      <motion.div
        className="absolute left-[200px] top-[536px]"
        variants={{ hidden: m.part.hidden, shown: { ...m.part.shown, transition: { ...m.fade, ...afterFlight } } }}
      >
        <RoundButton
          id={`show:${show.id}:add`}
          onSelect={() => toggleWatchlist(show.id)}
          label={added ? 'in your watchlist' : 'add to watchlist'}
        >
          {added ? '✓' : '+'}
        </RoundButton>
      </motion.div>

      <motion.div
        className="absolute left-[200px] top-[645px]"
        variants={{
          hidden: m.reduced
            ? m.part.hidden
            : { opacity: 0, y: distance.rowRise, transition: { ...m.rise, opacity: m.fade } },
          shown: m.reduced ? m.part.shown : { opacity: 1, y: 0, transition: { ...m.rise, ...later } },
        }}
      >
        <Row id={`episodes:${show.id}:${season.number}`} label={tabs} items={items} mode="big" enterDelay={m.reduced ? 0 : duration.riseDelay} />
      </motion.div>
    </main>
  )
}
