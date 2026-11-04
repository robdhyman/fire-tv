// Converts one generated image (Weave PNG) to a web JPG in public/art, the convert-art.mjs way:
// longest edge capped, JPEG quality stepped down until the file is under 400 KB.
// Usage: node scripts/convert-generated-art.mjs <src.png> <public/art/...jpg> [maxEdge]
// Edges in use: heroes 1920, posters 1500, stills 1180 (tiles are at most 590 wide).
import { execFileSync } from 'node:child_process'
import { mkdirSync, statSync } from 'node:fs'
import { dirname } from 'node:path'

const [src, dest, edge = '1920'] = process.argv.slice(2)
if (!src || !dest) {
  console.error('usage: node scripts/convert-generated-art.mjs <src> <dest.jpg> [maxEdge]')
  process.exit(1)
}
mkdirSync(dirname(dest), { recursive: true })
let quality = 82
for (;;) {
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(quality), '-Z', edge, src, '--out', dest], {
    stdio: 'ignore',
  })
  const bytes = statSync(dest).size
  if (bytes < 400_000 || quality <= 40) {
    const dims = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', dest]).toString()
    const width = /pixelWidth: (\d+)/.exec(dims)?.[1]
    const height = /pixelHeight: (\d+)/.exec(dims)?.[1]
    console.log(`${dest} ${width}x${height} ${(bytes / 1024).toFixed(0)} KB q${quality}`)
    break
  }
  quality -= 6
}
