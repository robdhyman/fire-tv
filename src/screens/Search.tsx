import { useEffect, useMemo, useRef, useState } from 'react'
import { Nav } from '../components/Nav'
import { Grid } from './Shows'
import { useFocusable, useFocusContext, useScreenFocus } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { brandShows } from '../data/catalogue'

/** Search stub: a typed filter over the brand's titles. */
export function Search() {
  const { settings } = useSettings()
  const { setFocus } = useFocusContext()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return brandShows(settings.brand).filter((s) => !q || s.title.toLowerCase().includes(q))
  }, [query, settings.brand])

  const { focused, props } = useFocusable<HTMLDivElement>('search:input', {
    onKey: (key) => {
      if (key === 'Enter' && results[0]) {
        setFocus(`grid:search:${results[0].id}`)
        return true
      }
      return false
    },
  })

  useEffect(() => {
    if (focused) inputRef.current?.focus()
    else inputRef.current?.blur()
  }, [focused])

  useScreenFocus('search', 'search:input')

  return (
    <main className="absolute inset-0 overflow-hidden bg-page">
      <Nav active="search" />
      <div
        {...props}
        className={`absolute left-[200px] top-[166px] flex h-[64px] w-[900px] items-center border-b-[3px] bg-white/5 px-[20px] transition-colors ${
          focused ? 'border-accent' : 'border-white/30'
        }`}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="type to search titles"
          spellCheck={false}
          className="w-full bg-transparent text-[30px] font-light text-white outline-none placeholder:text-white/40"
        />
      </div>
      {results.length === 0 ? (
        <p className="absolute left-[200px] top-[290px] text-[25px] font-light text-white/60">
          nothing matches “{query}”
        </p>
      ) : (
        <Grid shows={results} idPrefix="grid:search" top={290} />
      )}
    </main>
  )
}
