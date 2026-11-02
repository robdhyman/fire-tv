import { useMemo, useState } from 'react'
import { Nav } from '../components/Nav'
import { GRID, GridTile } from '../components/GridTile'
import { useFocusable, useFocusedId, useScreenFocus } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { brandShows, editorsChoiceFor, type Show } from '../data/catalogue'

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
      className={`leading-none transition-all duration-150 ${active ? 'text-[36px] text-white' : 'text-[25px] text-white/70'} ${
        focused ? 'underline decoration-accent decoration-[3px] underline-offset-[8px]' : ''
      }`}
    >
      {tab.label}
    </div>
  )
}

/** Four-column grid of the brand's shows with the tile row that holds focus kept in view. */
export function Grid({ shows, idPrefix, top }: { shows: Show[]; idPrefix: string; top: number }) {
  const focusedId = useFocusedId()
  const focusedRow = Math.floor(Math.max(0, shows.findIndex((s) => focusedId === `${idPrefix}:${s.id}`)) / GRID.cols)
  const scroll = Math.max(0, focusedRow - 1) * GRID.rowPitch
  return (
    <div
      className="absolute left-[200px] grid"
      style={{
        top,
        gridTemplateColumns: `repeat(${GRID.cols}, ${GRID.w}px)`,
        columnGap: GRID.colPitch - GRID.w,
        rowGap: GRID.rowPitch - GRID.h,
        transform: `translateY(${-scroll}px)`,
        transition: 'transform 250ms ease-out',
      }}
    >
      {shows.map((show) => (
        <GridTile key={show.id} id={`${idPrefix}:${show.id}`} show={show} />
      ))}
    </div>
  )
}

export function Shows() {
  const { settings } = useSettings()
  const [tab, setTab] = useState<Tab>('shows')
  const shows = useMemo(
    () => (tab === 'editors' ? editorsChoiceFor(settings.brand) : tab === 'shows' ? brandShows(settings.brand) : []),
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
      {tab === 'movies' ? (
        <p className="absolute left-[200px] top-[250px] text-[25px] font-light text-white/60">
          No movies in this catalogue yet.
        </p>
      ) : (
        <Grid shows={shows} idPrefix={`grid:${tab}`} top={250} />
      )}
    </main>
  )
}
