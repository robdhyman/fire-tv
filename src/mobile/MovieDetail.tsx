import { Navigate, useParams } from 'react-router'
import { useSettings } from '../state/settings'
import { BackButton, Pill } from './ui'
import { artUrl, catalogue, movieById, type Movie } from '../data/catalogue'

export function MobileMovieDetail() {
  const { id = '' } = useParams()
  const movie = movieById(id)
  if (!movie) return <Navigate to="/" replace />
  return <MoviePage key={movie.id} movie={movie} />
}

/**
 * A movie's page on a phone: the poster whole over a wash of its own
 * colours, then the title, logline and + beneath it (never over it) and a
 * `coming soon` line where a show's seasons would be. On a tablet the poster
 * moves to the left and the copy sits beside it.
 */
function MoviePage({ movie }: { movie: Movie }) {
  const { inWatchlist, toggleWatchlist } = useSettings()
  const added = inWatchlist(movie.id)

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] overflow-hidden" aria-hidden>
        <img
          src={artUrl(movie.posterArt)}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-60 blur-[40px] brightness-[0.45]"
          style={{ objectPosition: movie.artFocus }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-page to-transparent" />
      </div>
      <BackButton className="absolute left-gutter top-[calc(env(safe-area-inset-top)+12px)] z-10" />
      <div className="relative px-gutter pt-[calc(env(safe-area-inset-top)+64px)] md:flex md:items-end md:gap-[28px]">
        <img
          src={artUrl(movie.posterArt)}
          alt={movie.title}
          draggable={false}
          className="mx-auto aspect-[2/3] w-[62vw] rounded-[6px] object-cover shadow-[0_16px_40px_rgba(0,0,0,0.6)] md:mx-0 md:w-[30vw] md:shrink-0"
        />
        <div className="mt-[20px] md:mt-0 md:max-w-[52%]">
          <h1 className="display text-m-title text-white md:text-m-hero-md">{movie.title}</h1>
          <p className="mt-[8px] text-[14px] font-light leading-[1.4] text-white/85 md:text-[16px]">{movie.logline}</p>
          <div className="mt-[14px] flex gap-[10px]">
            <Pill onClick={() => toggleWatchlist(movie.id)} aria-pressed={added}>
              {added ? '✓ in watchlist' : '+ watchlist'}
            </Pill>
          </div>
        </div>
      </div>
      <p className="relative mt-[28px] px-gutter text-[18px] font-light leading-none text-white/90">
        coming soon to {catalogue.brands[movie.brand].name}
      </p>
      <div className="h-[24px]" />
    </main>
  )
}
