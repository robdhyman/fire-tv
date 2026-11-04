// Contact sheet for one show's raw takes, for checking a batch at a glance.
// Usage: node .scratch/batch-art/sheet.mjs <dir of PNGs> <out.jpg> [columns]
import { chromium } from 'playwright-core'
import { readdirSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const [dir, out, cols = '4', h = '300'] = process.argv.slice(2)
const files = readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort()
const cells = files
  .map((f) => `<figure><img src="file://${resolve(join(dir, f))}"><figcaption>${f}</figcaption></figure>`)
  .join('')
const html = `<!doctype html><style>
  body { margin: 0; background: #111; color: #ddd; font: 14px system-ui; display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 8px; padding: 8px; }
  figure { margin: 0; display: flex; flex-direction: column; align-items: center; }
  img { width: 100%; height: ${h}px; object-fit: contain; background: #000; }
</style>${cells}`
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1600, height: 400 } })
// about:blank can't load file:// images, so the sheet is a file too.
const htmlPath = join(mkdtempSync(join(tmpdir(), 'sheet-')), 'sheet.html')
writeFileSync(htmlPath, html)
await page.goto(`file://${htmlPath}`)
await page.waitForLoadState('networkidle')
await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 80 })
await browser.close()
