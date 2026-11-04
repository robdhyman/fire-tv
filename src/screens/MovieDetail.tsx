import { Navigate, useParams } from 'react-router'
import { Nav } from '../components/Nav'
import { RoundButton } from '../components/RoundButton'
import { useScreenFocus } from '../focus/FocusEngine'
import { useSettings } from '../state/settings'
import { artUrl, catalogue, movieById, type Movie } from '../data/catalogue'

/** The poster: 2:3, from under the nav to the foot of the stage, its right edge on the avatar's (x = 1720). */
const POSTER = { left: 1160, top: 160, w: 560, h: 840 }

export function MovieDetail() {
  const { id = '' } = useParams()
  const movie = movieById(id)
  if (!movie) return <Navigate to="/" replace />
  return <MoviePage movie={movie} />
}

/**
 * A movie's page, laid out like a show page with nothing to play: the
 * poster's colours wash the stage full bleed, the poster sits whole on the
 * right, and the title, logline and + are set beside it on the left (a
 * poster carries its title in the image, so nothing is set over it). A
 * `coming soon` line stands where the season row would be. Focus lands on
 * the +; the nav stays shown, since there is nothing below the + to reach.
 */
function MoviePage({ movie }: { movie: Movie }) {
  const { inWatchlist, toggleWatchlist } = useSettings()
  const added = inWatchlist(movie.id)
  useScreenFocus(`movie:${movie.id}`, `movie:${movie.id}:add`)

  return (
    <main className="absolute inset-0 overflow-hidden bg-page">
      <img
        src={artUrl(movie.posterArt)}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-[60px] brightness-[0.45]"
        style={{ objectPosition: movie.artFocus }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <Nav />

      <img
        src={artUrl(movie.posterArt)}
        alt={movie.title}
        draggable={false}
        className="absolute object-cover shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
        style={{ left: POSTER.left, top: POSTER.top, width: POSTER.w, height: POSTER.h }}
      />

      <div className="absolute left-[200px] top-[268px] max-w-[620px]">
        <h1 className="display text-title text-white">{movie.title}</h1>
        <p className="mt-[20px] text-[25px] font-light leading-[1.3] text-white">{movie.logline}</p>
      </div>

      <div className="absolute left-[200px] top-[536px]">
        <RoundButton
          id={`movie:${movie.id}:add`}
          onSelect={() => toggleWatchlist(movie.id)}
          label={added ? 'in your watchlist' : 'add to watchlist'}
        >
          {added ? '✓' : '+'}
        </RoundButton>
      </div>

      <p className="absolute left-[200px] top-[645px] text-[36px] font-light leading-none text-white">
        coming soon to {catalogue.brands[movie.brand].name}
      </p>
    </main>
  )
}
