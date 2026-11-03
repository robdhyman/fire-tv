import { useEffect, useState } from 'react'
import Markdown, { type Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Link, useParams } from 'react-router'

// Every Markdown file under docs/benchmarks, docs/research and docs/style-guide
// is bundled as a lazy raw import. Route /docs/<section>/<slug> maps to
// docs/<section>/<slug>.md; /docs/<section> and /docs map to that folder's index.md.
const pages = import.meta.glob('/docs/{benchmarks,research,style-guide}/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

// Links written as /docs/... in the Markdown navigate inside the router so the
// Pages base path is applied; everything else is a normal link.
const components: Components = {
  a({ href, children }) {
    if (href?.startsWith('/docs')) return <Link to={href}>{children}</Link>
    return <a href={href} target="_blank" rel="noreferrer">{children}</a>
  },
}

function resolve(splat: string | undefined): string | null {
  const parts = (splat ?? '').split('/').filter(Boolean)
  if (parts.length === 0) return null
  const direct = `/docs/${parts.join('/')}.md`
  if (direct in pages) return direct
  const index = `/docs/${parts.join('/')}/index.md`
  return index in pages ? index : null
}

export function DocsPage() {
  const { '*': splat } = useParams()
  const key = resolve(splat)
  const [body, setBody] = useState<string | null>(null)

  // The guide's swatches read the app's brand variables, so docs always render
  // in the SYFY default (USA blocks scope themselves with data-brand="usa").
  useEffect(() => {
    const root = document.documentElement
    const previous = root.dataset.brand
    delete root.dataset.brand
    return () => {
      if (previous) root.dataset.brand = previous
    }
  }, [])

  useEffect(() => {
    let live = true
    setBody(null)
    if (key) pages[key]().then((text) => live && setBody(text))
    return () => {
      live = false
    }
  }, [key])

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-white">
      <nav className="mb-8 flex gap-6 text-sm uppercase tracking-widest text-white/60">
        <Link to="/" className="hover:text-white">← app</Link>
        <Link to="/docs/benchmarks" className="hover:text-white">benchmarks</Link>
        <Link to="/docs/style-guide" className="hover:text-white">style guide</Link>
      </nav>
      {key === null ? (
        <section>
          <h1 className="mb-4 text-3xl font-bold">Docs</h1>
          <ul className="list-disc pl-5">
            <li><Link to="/docs/benchmarks" className="underline">Streaming benchmarks</Link></li>
            <li><Link to="/docs/style-guide" className="underline">Style guide</Link></li>
          </ul>
        </section>
      ) : body === null ? (
        <p className="text-white/60">Loading…</p>
      ) : (
        <article className="prose-docs">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>{body}</Markdown>
        </article>
      )}
    </main>
  )
}
