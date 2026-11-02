import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Home } from './screens/Home'

// Docs pull in the Markdown renderer, so they load as their own chunk.
const DocsPage = lazy(() => import('./docs/DocsPage').then((m) => ({ default: m.DocsPage })))

// Browser router with the Pages base path. Deep links work because the build
// copies index.html to 404.html, which GitHub Pages serves for unknown paths.
export const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
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
