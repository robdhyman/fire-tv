import { useMemo, useState } from 'react'
import { useSettings } from '../state/settings'
import { ScreenHeader, ShowGrid } from './ui'
import { brandShows } from '../data/catalogue'

/** Search stub on a phone: a typed filter over the brand's titles. */
export function MobileSearch() {
  const { settings } = useSettings()
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return brandShows(settings.brand).filter((s) => !q || s.title.toLowerCase().includes(q))
  }, [query, settings.brand])
  return (
    <main>
      <ScreenHeader title="search" />
      <div className="px-gutter">
        <label className="flex h-[44px] items-center gap-[10px] rounded-[8px] bg-white/10 px-[12px] focus-within:ring-2 focus-within:ring-accent">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/60">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4.2-4.2" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search titles"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
            className="w-full bg-transparent text-[16px] text-white outline-none placeholder:text-white/40"
          />
        </label>
      </div>
      {results.length === 0 ? (
        <p className="px-gutter pt-[20px] text-[15px] font-light text-white/60">nothing matches “{query}”</p>
      ) : (
        <ShowGrid shows={results} className="pt-[16px]" />
      )}
    </main>
  )
}
