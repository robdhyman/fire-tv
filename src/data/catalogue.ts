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
