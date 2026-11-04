// Writes the #34 prompt records from prompts/<show>.json: public/art/<show>/prompts.md and the
// matching entries in public/art/prompts.json (the "prompts that made them" on map #25).
// Usage: node .scratch/batch-art/write-records.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

const art = new URL('../../public/art/', import.meta.url)
const MODEL = 'fal-ai/nano-banana-2 (Nano Banana 2.1, via Figma Weave)'
const DATE = '2026-11-04'
const record = JSON.parse(readFileSync(new URL('prompts.json', art)))

// Per-file notes that belong in the record (retakes, keeps that needed a judgement).
const NOTES = {
  'whiteout/hero.jpg': 'Retake. The first take (same seed, gear not described as unbranded) put an Oakley-style logo on the helmet; the prompt now asks for plain unbranded gear, and so do the stills that show riders.',
}

const where = (f) => `${f.aspect} at ${f.resolution}, thinking ${f.thinking}, ${f.reference ? `reference image \`${f.reference}\`` : 'no reference image'}`

const files = readdirSync(new URL('./prompts/', import.meta.url)).filter((f) => f.endsWith('.json')).sort()
for (const name of files) {
  const p = JSON.parse(readFileSync(new URL(`./prompts/${name}`, import.meta.url)))
  const poster = p.id === 'coming-soon'
  const entries = {}
  const sections = []
  for (const f of p.files) {
    const note = NOTES[`${p.id}/${f.file}`]
    entries[f.file] = {
      model: MODEL, suffix: 'HS-1', date: DATE,
      ...(f.file.startsWith('still-') ? { template: 'still v2' } : {}),
      ...(poster ? { title: f.title, brand: f.brand } : {}),
      seed: f.seed, aspect: f.aspect, resolution: f.resolution, thinking: f.thinking, reference: f.reference,
      prompt: f.prompt,
      ...(note ? { note } : {}),
    }
    sections.push(`## ${f.file}\n\nSeed ${f.seed}, ${where(f)}.${note ? ` ${note}` : ''}\n\n\`\`\`\n${f.prompt}\n\`\`\`\n`)
  }
  record[p.id] = entries

  const intro = poster
    ? [
        '# Coming Soon posters: generated art prompts',
        '',
        'Ten posters for the Coming Soon row: eight from Batch art (#34), four SYFY and four USA, and the two from the style lock (#33) re-made with their titles. Posters carry their title in the image (Rob, 3 Nov), so the app never sets a title over poster art. The title line names the brand face (SYFY a tall condensed sans-serif, USA a wide geometric sans-serif) and HS-1 drops "No on-screen text, no lettering,". Each title sits in the top third but below its top 15%, because the row\'s `coming soon` badge covers the top 13% of a poster tile (#35). Every title was spelled right on the first take.',
        '',
        'Low Orbit and The Night Desk keep their #33 prompt and seed word for word and only gain the title line; their title-clear versions are in git history. The first Low Orbit (seed 31415) asked for "a dark quiet gradient" in the top third and got a hard flat band, which is why the new posters ask for the scene to fall away into darkness instead.',
      ]
    : [
        `# ${p.title}: generated art prompts`,
        '',
        `Batch art for issue #34, in the house style locked by The Drowned Court (#33): HS-1 with this show's palette (${p.palette}) and accent (${p.accent}), still template v2, a seed per file (show code × 1000 + 1 for the hero, + 2 for the key art, + season × 10 + episode for each still).`,
        '',
        'The hero was generated fresh from text with its subject right of centre (Rob, 3 Nov) and is the reference image for the key art and every still. It is not wired into the catalogue: hero art stays the Unsplash placeholder (Rob, 4 Nov, on #36), and the generated art is episodic only. The stills are each episode\'s `still` in `src/data/catalogue.json`.',
      ]
  const broll = (() => { try { readFileSync(new URL(`${p.id}/broll.md`, art)); return true } catch { return false } })()
  if (broll) intro.push('', 'The b-roll clip beside these files (`broll.mp4`, #36) starts from the placeholder hero; its prompt is in [broll.md](broll.md).')
  intro.push('', `Model: ${MODEL}. House-style suffix HS-1. Generated ${DATE} (UTC). Machine-readable copy: [../prompts.json](../prompts.json).`, '')
  writeFileSync(new URL(`${p.id}/prompts.md`, art), intro.join('\n') + '\n' + sections.join('\n'))
  console.log(`${p.id}: ${p.files.length} entries`)
}
writeFileSync(new URL('prompts.json', art), JSON.stringify(record, null, 2) + '\n')
