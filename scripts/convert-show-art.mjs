// Converts one show's generated art (Weave PNGs) to web-sized JPGs in public/art/<show>/.
// Same rule as convert-art.mjs: 1920px max edge, JPEG quality stepped down until each file is under 400 KB.
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
  let quality = 82
  for (;;) {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(quality), '-Z', '1920', join(src, file), '--out', dest], { stdio: 'ignore' })
    const bytes = statSync(dest).size
    if (bytes < 400_000 || quality <= 40) {
      console.log(`${file} -> ${show}/${file.replace(/\.png$/i, '.jpg')} ${(bytes / 1024).toFixed(0)} KB q${quality}`)
      break
    }
    quality -= 6
  }
}
