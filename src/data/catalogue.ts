import data from './catalogue.json'

export type Brand = 'syfy' | 'usa'
export type Episode = { number: number; title: string; synopsis: string; duration: number }
export type Season = { number: number; episodes: Episode[] }
export type Show = {
  id: string
  brand: Brand
  title: string
  genre: string
  logline: string
  /** File in public/art/. Resolve with artUrl(). */
  heroArt: string
  tileArt: string
  /** CSS object-position for the 16:9 hero crop; most photos are portrait. */
  artFocus: string
  new: boolean
  expiring: boolean
  seasons: Season[]
}
export type UpNextEntry = { show: string; season: number; episode: number; progress: number }
export type Rows = { upNext: UpNextEntry[]; recentlyAdded: string[]; editorsChoice: string[] }
export type Catalogue = {
  brands: Record<Brand, { name: string; genres: string[] }>
  shows: Show[]
  rows: Rows
}

export const catalogue = data as Catalogue

/** URL for a file in public/art/, honouring the Vite base path. */
export const artUrl = (file: string) => `${import.meta.env.BASE_URL}art/${file}`

export const showById = (id: string) => catalogue.shows.find((s) => s.id === id)

export const brandShows = (brand: Brand) => catalogue.shows.filter((s) => s.brand === brand)

/** One episode in context: the row item everything else is built from. */
export type EpisodeRef = { show: Show; season: Season; episode: Episode; progress: number }

export const episodeKey = (ref: EpisodeRef) => `${ref.show.id}-${ref.season.number}-${ref.episode.number}`

export function episodeRef(showId: string, season: number, episode: number, progress = 0): EpisodeRef | null {
  const show = showById(showId)
  const s = show?.seasons.find((x) => x.number === season)
  const e = s?.episodes.find((x) => x.number === episode)
  return show && s && e ? { show, season: s, episode: e, progress } : null
}

export function allEpisodes(show: Show): EpisodeRef[] {
  return show.seasons.flatMap((season) =>
    season.episodes.map((episode) => ({ show, season, episode, progress: 0 })),
  )
}

/** Up Next for a brand: the catalogue's entries, then S1 E1 of its other shows. */
export function upNextFor(brand: Brand): EpisodeRef[] {
  const listed = catalogue.rows.upNext
    .map((u) => episodeRef(u.show, u.season, u.episode, u.progress))
    .filter((r): r is EpisodeRef => !!r && r.show.brand === brand)
  const seen = new Set(listed.map((r) => r.show.id))
  const rest = brandShows(brand)
    .filter((s) => !seen.has(s.id))
    .map((s) => ({ show: s, season: s.seasons[0], episode: s.seasons[0].episodes[0], progress: 0 }))
  return [...listed, ...rest]
}

/** Recently added: the catalogue's list first, then the brand's other shows. */
export function recentlyAddedFor(brand: Brand): Show[] {
  const listed = catalogue.rows.recentlyAdded.map(showById).filter((s): s is Show => !!s && s.brand === brand)
  const seen = new Set(listed.map((s) => s.id))
  return [...listed, ...brandShows(brand).filter((s) => !seen.has(s.id))]
}

export function editorsChoiceFor(brand: Brand): Show[] {
  return catalogue.rows.editorsChoice.map(showById).filter((s): s is Show => !!s && s.brand === brand)
}

/** Badge rule: a new show's latest two episodes are `new`; an expiring show's first two are `expiring`. */
export function episodeBadge(ref: EpisodeRef): 'new' | 'expiring' | undefined {
  const { show, season, episode } = ref
  const last = show.seasons[show.seasons.length - 1]
  if (show.new && season === last && episode.number > last.episodes.length - 2) return 'new'
  if (show.expiring && season === show.seasons[0] && episode.number <= 2) return 'expiring'
  return undefined
}

export function nextEpisode(ref: EpisodeRef): EpisodeRef | null {
  const { show, season, episode } = ref
  const inSeason = season.episodes.find((e) => e.number === episode.number + 1)
  if (inSeason) return { show, season, episode: inSeason, progress: 0 }
  const nextSeason = show.seasons.find((s) => s.number === season.number + 1)
  return nextSeason ? { show, season: nextSeason, episode: nextSeason.episodes[0], progress: 0 } : null
}

/** Total length in seconds: the minutes from the catalogue plus a stable spread of seconds. */
export function runtimeSeconds(ref: EpisodeRef): number {
  let h = 0
  for (const ch of episodeKey(ref)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return ref.episode.duration * 60 + (h % 60)
}

export function timecode(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/** Episode stills: the show's art with a crop that walks across it per episode. */
const CROPS = ['50% 20%', '30% 40%', '70% 30%', '50% 60%', '20% 50%', '80% 50%', '50% 80%', '40% 10%']
export function stillFocus(ref: EpisodeRef): string {
  return CROPS[(ref.season.number * 7 + ref.episode.number) % CROPS.length]
}
