import { useMemo, useState } from 'react'
import { useSettings } from '../state/settings'
import { ScreenHeader, ShowGrid, TextTabs } from './ui'
import { brandShows, editorsChoiceFor } from '../data/catalogue'

type Tab = 'shows' | 'movies' | 'editors'
const TABS: { key: Tab; label: string }[] = [
  { key: 'shows', label: 'shows' },
  { key: 'movies', label: 'movies' },
  { key: 'editors', label: "editor's choice" },
]

/** Shows on a phone: the three tabs over a two-column key-art grid. */
export function MobileShows() {
  const { settings } = useSettings()
  const [tab, setTab] = useState<Tab>('shows')
  const shows = useMemo(
    () => (tab === 'editors' ? editorsChoiceFor(settings.brand) : tab === 'shows' ? brandShows(settings.brand) : []),
    [tab, settings.brand],
  )
  return (
    <main>
      <ScreenHeader title="shows" />
      <TextTabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === 'movies' ? (
        <p className="px-gutter pt-[20px] text-[15px] font-light text-white/60">No movies in this catalogue yet.</p>
      ) : (
        <ShowGrid shows={shows} className="pt-[14px]" />
      )}
    </main>
  )
}
