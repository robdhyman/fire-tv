import data from './catalogue.json'

export type Brand = 'syfy' | 'usa'
export type Episode = {
  number: number
  title: string
  synopsis: string
  duration: number
  /** Generated still in public/art/; without one the tile crops the show's art. */
  still?: string
}
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
/** The catalogue's Up Next: the first-run seed for the persisted watch positions. */
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

/** One episode in context: the row item everything else is built from. `progress` is its watch position as a fraction of the runtime. */
export type EpisodeRef = { show: Show; season: Season; episode: Episode; progress: number }

export const episodeKey = (ref: Pick<EpisodeRef, 'show' | 'season' | 'episode'>) =>
  `${ref.show.id}-${ref.season.number}-${ref.episode.number}`

/**
 * Watch positions, keyed by episodeKey: elapsed and total seconds for every
 * episode the viewer has started and not finished. The Player writes them;
 * src/state/settings.tsx persists them, seeded from the catalogue's Up Next.
 * Insertion order is Up Next order.
 */
export type WatchPosition = { elapsed: number; runtime: number }
export type WatchPositions = Record<string, WatchPosition>

/** An episode with its watch position read from `watch`. */
export function toEpisodeRef(show: Show, season: Season, episode: Episode, watch: WatchPositions): EpisodeRef {
  const p = watch[episodeKey({ show, season, episode })]
  return { show, season, episode, progress: p && p.runtime > 0 ? Math.min(1, p.elapsed / p.runtime) : 0 }
}

export function episodeRef(showId: string, season: number, episode: number, watch: WatchPositions): EpisodeRef | null {
  const show = showById(showId)
  const s = show?.seasons.find((x) => x.number === season)
  const e = s?.episodes.find((x) => x.number === episode)
  return show && s && e ? toEpisodeRef(show, s, e, watch) : null
}

/** The episode an episodeKey names; show ids hold dashes, so the numbers are read from the end. */
function refFromKey(key: string, watch: WatchPositions): EpisodeRef | null {
  const m = /^(.+)-(\d+)-(\d+)$/.exec(key)
  return m ? episodeRef(m[1], Number(m[2]), Number(m[3]), watch) : null
}

export function allEpisodes(show: Show, watch: WatchPositions): EpisodeRef[] {
  return show.seasons.flatMap((season) => season.episodes.map((episode) => toEpisodeRef(show, season, episode, watch)))
}

/** Up Next for a brand: the episodes with a watch position in saved order (the catalogue's seeds first), then S1 E1 of its other shows. */
export function upNextFor(brand: Brand, watch: WatchPositions): EpisodeRef[] {
  const listed = Object.keys(watch)
    .map((key) => refFromKey(key, watch))
    .filter((r): r is EpisodeRef => !!r && r.show.brand === brand)
  const seen = new Set(listed.map((r) => r.show.id))
  const rest = brandShows(brand)
    .filter((s) => !seen.has(s.id))
    .map((s) => toEpisodeRef(s, s.seasons[0], s.seasons[0].episodes[0], watch))
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
export function runtimeSeconds(ref: Pick<EpisodeRef, 'show' | 'season' | 'episode'>): number {
  let h = 0
  for (const ch of episodeKey(ref)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return ref.episode.duration * 60 + (h % 60)
}

export function timecode(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/** Episode stills: the episode's own still, else the show's art with a crop that walks across it per episode. */
const CROPS = ['50% 20%', '30% 40%', '70% 30%', '50% 60%', '20% 50%', '80% 50%', '50% 80%', '40% 10%']
export function stillArt(ref: EpisodeRef): string {
  return ref.episode.still ?? ref.show.tileArt
}
export function stillFocus(ref: EpisodeRef): string {
  if (ref.episode.still) return '50% 50%'
  return CROPS[(ref.season.number * 7 + ref.episode.number) % CROPS.length]
}
