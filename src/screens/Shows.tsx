import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Nav } from '../components/Nav'
import { GRID, GridTile } from '../components/GridTile'
import { useFocusable, useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { useMotion } from '../motion/useMotion'
import { brandShows, comingSoonFor, editorsChoiceFor, type Movie, type Show } from '../data/catalogue'

type Tab = 'shows' | 'movies' | 'editors'
const TABS: { key: Tab; label: string }[] = [
  { key: 'shows', label: 'shows' },
  { key: 'movies', label: 'movies' },
  { key: 'editors', label: "editor's choice" },
]

function TabItem({ tab, active, onSelect }: { tab: (typeof TABS)[number]; active: boolean; onSelect: () => void }) {
  const { focused, props } = useFocusable(`tab:${tab.key}`, { onSelect })
  return (
    <div
      {...props}
      className={`leading-none transition-all duration-(--motion-quick) ${active ? 'text-[36px] text-white' : 'text-[25px] text-white/70'} ${
        focused ? 'underline decoration-accent decoration-[3px] underline-offset-[8px]' : ''
      }`}
    >
      {tab.label}
    </div>
  )
}

/** Four-column grid of the brand's shows or movies with the tile row that holds focus kept in view. */
export function Grid({ entries, idPrefix, top }: { entries: (Show | Movie)[]; idPrefix: string; top: number }) {
  const focusedId = useFocusedId()
  const focusedRow = Math.floor(Math.max(0, entries.findIndex((s) => focusedId === `${idPrefix}:${s.id}`)) / GRID.cols)
  const scroll = Math.max(0, focusedRow - 1) * GRID.rowPitch
  const m = useMotion()
  return (
    <motion.div className="absolute left-[200px]" style={{ top }} initial={false} animate={{ y: -scroll }} transition={m.scroll}>
      <motion.div
        key={idPrefix}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID.cols}, ${GRID.w}px)`,
          columnGap: GRID.colPitch - GRID.w,
          rowGap: GRID.rowPitch - GRID.h,
        }}
        variants={m.stagger()}
        initial="hidden"
        animate="shown"
      >
        {entries.map((entry) => (
          <GridTile key={entry.id} id={`${idPrefix}:${entry.id}`} entry={entry} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export function Shows() {
  const { settings } = useSettings()
  const [tab, setTab] = useState<Tab>('shows')
  const entries = useMemo(
    () =>
      tab === 'editors' ? editorsChoiceFor(settings.brand) : tab === 'shows' ? brandShows(settings.brand) : comingSoonFor(settings.brand),
    [tab, settings.brand],
  )
  useScreenFocus(`shows:${settings.brand}`, 'tab:shows')

  return (
    <main className="absolute inset-0 overflow-hidden bg-page">
      <Nav active="shows" />
      <div className="absolute left-[200px] top-[160px] z-10 flex items-baseline gap-[48px]">
        {TABS.map((t) => (
          <TabItem key={t.key} tab={t} active={tab === t.key} onSelect={() => setTab(t.key)} />
        ))}
      </div>
      {entries.length === 0 ? (
        <p className="absolute left-[200px] top-[250px] text-[25px] font-light text-white/60">
          No movies in this catalogue yet.
        </p>
      ) : (
        <Grid entries={entries} idPrefix={`grid:${tab}`} top={250} />
      )}
    </main>
  )
}
