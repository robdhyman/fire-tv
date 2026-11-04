// Builds the #34 batch prompts from the style lock's templates (HS-1, still template v2).
// Usage: node .scratch/batch-art/build-prompts.mjs  -> writes prompts/<show>.json beside it.
// Each entry: { file, seed, aspect, resolution, thinking, reference, prompt }.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { shows, posters } from './scenes.mjs'

const catalogue = JSON.parse(readFileSync(new URL('../../src/data/catalogue.json', import.meta.url)))

// HS-1, verbatim from the research doc. Posters with a title drop "No on-screen text, no lettering,".
export const hs1 = (palette, accent, text = true) =>
  `Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of ${palette} with a single accent of ${accent}, colour held consistent across the series. ${text ? 'No on-screen text, no lettering, no logos' : 'No logos'}, no watermark, no captions, no subtitles, no UI. No one looks at the camera.`

const BARS_169 = 'Full-frame 16:9, no black bars.'
const BARS_23 = 'Full-frame 2:3, no black bars.'
const TOP_FALLS_AWAY = 'the lower two-thirds carry the image and the scene itself continues upward and falls away into darkness in the top third, with no hard edge, no band and no detail'
const FACE = { syfy: 'a tall condensed sans-serif', usa: 'a wide geometric sans-serif' }

const out = new URL('./prompts/', import.meta.url)
mkdirSync(out, { recursive: true })

for (const [id, s] of Object.entries(shows)) {
  const show = catalogue.shows.find((x) => x.id === id)
  if (!show) throw new Error(`no show ${id}`)
  const style = hs1(s.palette, s.accent)
  const head = `${show.title}, a ${show.genre} series. ${show.logline}`
  const files = []
  // TV hero, right of centre (Rob, 3 Nov): generated fresh from text, no reference image.
  files.push({
    file: 'hero.jpg', seed: s.code * 1000 + 1, aspect: '16:9', resolution: '2K', thinking: 'High', reference: null,
    prompt: `${head}\nEstablishing image of the series' world with its central ${s.heroWho} held right of centre, between 45% and 75% of the frame width: ${s.hero}; the left 40% of the frame only ${s.heroLeft} with no figures and no detail, nothing essential near the right edge, no cropped faces, no action at the frame edge, no signage and no writing anywhere in the frame. ${BARS_169}\n${style}`,
  })
  files.push({
    file: 'key-art.jpg', seed: s.code * 1000 + 2, aspect: '2:3', resolution: '2K', thinking: 'High', reference: 'hero.jpg',
    prompt: `${head}\nKey art, vertical: ${s.keyArt}; ${TOP_FALLS_AWAY}, no signage and no writing anywhere in the frame. ${BARS_23}\n${style}`,
  })
  for (const season of show.seasons) {
    for (const ep of season.episodes) {
      const k = `${season.number}x${ep.number}`
      const scene = s.stills[k]
      if (!scene) throw new Error(`${id} ${k}: no scene`)
      files.push({
        file: `still-${k}.jpg`, seed: s.code * 1000 + season.number * 10 + ep.number, aspect: '16:9', resolution: '1K', thinking: 'Minimal', reference: 'hero.jpg',
        prompt: `Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures${s.heroObjects ? `, ${s.heroObjects}` : ''} or layout. New scene from the same series, episode ${k} "${ep.title}": ${ep.synopsis}\nSingle moment: ${scene}, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. ${BARS_169}\n${style}`,
      })
    }
  }
  const extra = Object.keys(s.stills).filter((k) => !files.some((f) => f.file === `still-${k}.jpg`))
  if (extra.length) throw new Error(`${id}: scenes for missing episodes ${extra}`)
  writeFileSync(new URL(`${id}.json`, out), JSON.stringify({ id, title: show.title, palette: s.palette, accent: s.accent, files }, null, 1) + '\n')
  console.log(`${id}: ${files.length} files`)
}

// Coming Soon posters: title in the image (Rob, 3 Nov), the research doc's title-in-image template.
const pfiles = posters.map((p) => ({
  file: `${p.slug}.jpg`, seed: p.seed, aspect: '2:3', resolution: '2K', thinking: 'High', reference: null,
  title: p.title, brand: p.brand, genre: p.genre, logline: p.logline,
  // A re-made poster keeps its #33 prompt and seed word for word and only gains the title line.
  prompt: `${p.original ?? `${p.title}, a ${p.genre} film. ${p.logline}\nKey art, vertical: ${p.scene}; ${TOP_FALLS_AWAY}. ${BARS_23}`}\nThe title "${p.title.toUpperCase()}" set once, large, centred in the top third but kept below the top 15% of the frame, in ${FACE[p.brand]}, ${p.titleColour}, perfectly legible, correctly spelled, nothing else written.\n${hs1(p.palette, p.accent, false)}`,
}))
writeFileSync(new URL('coming-soon.json', out), JSON.stringify({ id: 'coming-soon', files: pfiles }, null, 1) + '\n')
console.log(`coming-soon: ${pfiles.length} files`)
