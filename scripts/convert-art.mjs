// Converts the 14 Unsplash originals (iCloud, AVIF/JPG) to web-sized JPGs in public/art.
// 1920px max edge, JPEG quality stepped down until each file is under 400 KB.
// Writes public/art/manifest.json mapping original filename -> new name.
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const src =
  process.argv[2] ??
  `${process.env.HOME}/Library/Mobile Documents/com~apple~CloudDocs/Claude/Cowork/nbcu-firetv/artwork`
const out = new URL('../public/art/', import.meta.url).pathname
mkdirSync(out, { recursive: true })

const files = readdirSync(src)
  .filter((f) => /\.(avif|jpe?g|png)$/i.test(f))
  .sort()
const manifest = []
files.forEach((file, i) => {
  const name = `art-${String(i + 1).padStart(2, '0')}.jpg`
  const dest = join(out, name)
  let quality = 82
  for (;;) {
    execFileSync('sips', [
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', String(quality),
      '-Z', '1920',
      join(src, file),
      '--out', dest,
    ], { stdio: 'ignore' })
    const bytes = statSync(dest).size
    if (bytes < 400_000 || quality <= 40) {
      const dims = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', dest]).toString()
      const width = Number(/pixelWidth: (\d+)/.exec(dims)?.[1])
      const height = Number(/pixelHeight: (\d+)/.exec(dims)?.[1])
      manifest.push({ original: file, file: name, width, height, bytes, quality })
      console.log(`${file} -> ${name} ${width}x${height} ${(bytes / 1024).toFixed(0)} KB q${quality}`)
      break
    }
    quality -= 6
  }
})
writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
