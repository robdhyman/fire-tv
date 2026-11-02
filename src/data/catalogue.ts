import data from './catalogue.json'

export type Episode = { number: number; name: string; still: string; runtime: number }
export type Season = { number: number; episodes: Episode[] }
export type Show = {
  id: string
  title: string
  logline: string
  hero: string
  tile: string
  new: boolean
  expiring: boolean
  seasons: Season[]
}

export const catalogue: { shows: Show[] } = data
