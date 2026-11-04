import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Shell } from './app/Shell'
import { Home } from './screens/Home'
import { Shows } from './screens/Shows'
import { ShowDetail } from './screens/ShowDetail'
import { MovieDetail } from './screens/MovieDetail'
import { Player } from './screens/Player'
import { Watchlist } from './screens/Watchlist'
import { Tools } from './screens/Tools'
import { Search } from './screens/Search'
import { Adaptive } from './app/device'
import { MobileHome } from './mobile/Home'
import { MobileShows } from './mobile/Shows'
import { MobileShowDetail } from './mobile/ShowDetail'
import { MobileMovieDetail } from './mobile/MovieDetail'
import { MobilePlayer } from './mobile/Player'
import { MobileWatchlist } from './mobile/Watchlist'
import { MobileTools } from './mobile/Tools'
import { MobileSearch } from './mobile/Search'

// Docs pull in the Markdown renderer, so they load as their own chunk.
const DocsPage = lazy(() => import('./docs/DocsPage').then((m) => ({ default: m.DocsPage })))

// Browser router with the Pages base path. Deep links work because the build
// copies index.html to 404.html, which GitHub Pages serves for unknown paths.
export const router = createBrowserRouter(
  [
    {
      element: <Shell />,
      children: [
        // Each route has a TV screen and a mobile one; the device class picks (src/app/device.tsx).
        { path: '/', element: <Adaptive tv={<Home />} mobile={<MobileHome />} /> },
        { path: '/shows', element: <Adaptive tv={<Shows />} mobile={<MobileShows />} /> },
        { path: '/show/:id', element: <Adaptive tv={<ShowDetail />} mobile={<MobileShowDetail />} /> },
        { path: '/movie/:id', element: <Adaptive tv={<MovieDetail />} mobile={<MobileMovieDetail />} /> },
        { path: '/play/:showId/:season/:episode', element: <Adaptive tv={<Player />} mobile={<MobilePlayer />} /> },
        { path: '/watchlist', element: <Adaptive tv={<Watchlist />} mobile={<MobileWatchlist />} /> },
        { path: '/tools', element: <Adaptive tv={<Tools />} mobile={<MobileTools />} /> },
        { path: '/search', element: <Adaptive tv={<Search />} mobile={<MobileSearch />} /> },
      ],
    },
    {
      path: '/docs/*',
      element: (
        <Suspense fallback={<p className="p-10 text-white/60">Loading…</p>}>
          <DocsPage />
        </Suspense>
      ),
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') },
)
