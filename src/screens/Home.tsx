import { motion } from 'motion/react'
import { Link } from 'react-router'
import { artUrl, catalogue } from '../data/catalogue'

export function Home() {
  const [featured, ...rest] = catalogue.shows
  const tiles = [...catalogue.shows, ...rest, ...catalogue.shows]

  return (
    <main className="min-h-full bg-black text-white">
      <header className="flex items-center justify-between px-12 py-6">
        <span className="font-display text-4xl font-bold tracking-tight text-brand">SYFY</span>
        <nav className="flex gap-8 text-sm uppercase tracking-widest text-white/60">
          <span className="text-white">Home</span>
          <span>Shows</span>
          <span>Watchlist</span>
          <span>Search</span>
          <span>Tools</span>
          <Link to="/docs" className="hover:text-white">Docs</Link>
        </nav>
      </header>

      <section className="relative mx-12 aspect-[21/9] overflow-hidden rounded-lg">
        <img
          src={artUrl(featured.heroArt)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: featured.artFocus }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <motion.div
          className="absolute bottom-12 left-12 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {featured.new && (
            <span className="mb-3 inline-block bg-brand px-2 py-0.5 text-xs font-bold uppercase text-black">new</span>
          )}
          <h1 className="font-display text-6xl font-bold uppercase">{featured.title}</h1>
          <p className="mt-3 text-lg text-white/80">{featured.logline}</p>
        </motion.div>
      </section>

      <section className="mt-10 px-12">
        <h2 className="mb-3 text-sm uppercase tracking-widest text-white/60">recently added</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {tiles.map((show, i) => (
            <motion.div
              key={`${show.id}-${i}`}
              className="relative w-64 shrink-0 overflow-hidden rounded"
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={artUrl(show.tileArt)}
                alt=""
                className="aspect-video w-full object-cover"
                style={{ objectPosition: show.artFocus }}
              />
              {show.new && (
                <span className="absolute left-2 top-2 bg-brand px-1.5 text-[10px] font-bold uppercase text-black">new</span>
              )}
              {show.expiring && (
                <span className="absolute left-2 top-2 bg-white px-1.5 text-[10px] font-bold uppercase text-black">expiring</span>
              )}
              <p className="mt-2 text-sm">{show.title}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
