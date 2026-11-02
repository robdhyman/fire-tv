import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Shell } from './app/Shell'
import { Home } from './screens/Home'
import { Shows } from './screens/Shows'
import { ShowDetail } from './screens/ShowDetail'
import { Player } from './screens/Player'
import { Watchlist } from './screens/Watchlist'
import { Tools } from './screens/Tools'
import { Search } from './screens/Search'

// Docs pull in the Markdown renderer, so they load as their own chunk.
const DocsPage = lazy(() => import('./docs/DocsPage').then((m) => ({ default: m.DocsPage })))

// Browser router with the Pages base path. Deep links work because the build
// copies index.html to 404.html, which GitHub Pages serves for unknown paths.
export const router = createBrowserRouter(
  [
    {
      element: <Shell />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/shows', element: <Shows /> },
        { path: '/show/:id', element: <ShowDetail /> },
        { path: '/play/:showId/:season/:episode', element: <Player /> },
        { path: '/watchlist', element: <Watchlist /> },
        { path: '/tools', element: <Tools /> },
        { path: '/search', element: <Search /> },
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
