// Converts one show's generated art (Weave PNGs) to web-sized JPGs in public/art/<show>/.
// Same rule as convert-art.mjs: 1920px max edge, JPEG quality stepped down until each file is under 400 KB.
// Stills (still-*.png) get a 1180px edge: tiles are at most 590 wide, so that is 2x.
// Usage: node scripts/convert-show-art.mjs <srcDir> <show>
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const [src, show] = process.argv.slice(2)
if (!src || !show) throw new Error('usage: convert-show-art.mjs <srcDir> <show>')
const out = new URL(`../public/art/${show}/`, import.meta.url).pathname
mkdirSync(out, { recursive: true })

for (const file of readdirSync(src).filter((f) => /\.png$/i.test(f)).sort()) {
  const dest = join(out, file.replace(/\.png$/i, '.jpg'))
  const edge = /^still-/i.test(file) ? '1180' : '1920'
  let quality = 82
  for (;;) {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(quality), '-Z', edge, join(src, file), '--out', dest], { stdio: 'ignore' })
    const bytes = statSync(dest).size
    if (bytes < 400_000 || quality <= 40) {
      console.log(`${file} -> ${show}/${file.replace(/\.png$/i, '.jpg')} ${(bytes / 1024).toFixed(0)} KB q${quality}`)
      break
    }
    quality -= 6
  }
}
