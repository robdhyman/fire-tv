// Capture each screen at 1920x1080 from a running preview, driving it by keyboard.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir]
// Needs Google Chrome installed; uses playwright-core with the "chrome" channel.
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const base = (process.argv[2] ?? 'http://localhost:4173/fire-tv').replace(/\/$/, '')
const out = process.argv[3] ?? 'docs/screens'
mkdirSync(out, { recursive: true })

const shots = [
  { name: 'home', path: '/', keys: [] },
  { name: 'home-rows', path: '/', keys: ['ArrowDown'] },
  { name: 'shows', path: '/shows', keys: ['ArrowDown'] },
  { name: 'show-detail', path: '/show/ringfall', keys: [] },
  { name: 'player', path: '/play/ringfall/3/2', keys: [] },
  { name: 'player-credits', path: '/play/ringfall/3/2', keys: Array(10).fill('ArrowRight') },
  { name: 'watchlist', path: '/watchlist', keys: [] },
  { name: 'tools', path: '/tools', keys: [] },
  { name: 'search', path: '/search', keys: [], type: 'the' },
  { name: 'home-usa', path: '/', keys: [], brand: 'usa' },
]

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto(base + '/')
await page.evaluate(() =>
  localStorage.setItem('fire-tv.settings', JSON.stringify({ hintSeen: true, brand: 'syfy' })),
)

for (const shot of shots) {
  await page.evaluate((brand) => {
    const s = JSON.parse(localStorage.getItem('fire-tv.settings') ?? '{}')
    localStorage.setItem('fire-tv.settings', JSON.stringify({ ...s, brand }))
  }, shot.brand ?? 'syfy')
  await page.goto(base + shot.path)
  await page.waitForTimeout(600)
  if (shot.type) await page.keyboard.type(shot.type)
  for (const key of shot.keys) {
    await page.keyboard.press(key)
    await page.waitForTimeout(80)
  }
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${out}/${shot.name}.png` })
  console.log(shot.name)
}
await browser.close()
