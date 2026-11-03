// Capture the phone and tablet layouts (issue #13) with Chrome's device emulation.
// Usage: node scripts/mobile-screens.mjs [baseUrl] [outDir]
import { chromium, devices } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const [baseArg, outArg] = process.argv.slice(2)
const base = (baseArg ?? 'http://localhost:4173/fire-tv').replace(/\/$/, '')
const out = outArg ?? 'docs/screens/mobile'
mkdirSync(out, { recursive: true })

const CLASSES = [
  { name: 'phone', device: devices['iPhone 13'] },
  { name: 'tablet', device: devices['iPad (gen 7)'] },
]

const SCREENS = [
  { name: 'home', path: '/' },
  { name: 'home-swiped', path: '/', swipe: true },
  { name: 'shows', path: '/shows' },
  { name: 'show-detail', path: '/show/ringfall' },
  { name: 'show-detail-episodes', path: '/show/ringfall', scroll: 'episodes' },
  { name: 'player', path: '/play/ringfall/3/2', chrome: true },
  { name: 'player-credits', path: '/play/ringfall/3/2', credits: true },
  { name: 'watchlist', path: '/watchlist' },
  { name: 'tools', path: '/tools' },
  { name: 'search', path: '/search' },
]

const browser = await chromium.launch({ channel: 'chrome' })
for (const cls of CLASSES) {
  const ctx = await browser.newContext({ ...cls.device, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(base + '/')
  await page.evaluate(() => localStorage.setItem('fire-tv.settings', JSON.stringify({ hintSeen: true, brand: 'syfy' })))
  for (const s of SCREENS) {
    await page.goto(base + s.path)
    await page.waitForTimeout(600)
    if (s.swipe) {
      await page.evaluate(() => {
        const strip = document.querySelector('[data-hero-strip]')
        strip.scrollTo({ left: strip.clientWidth, behavior: 'instant' })
      })
      await page.waitForTimeout(300)
    }
    if (s.scroll === 'episodes') {
      await page.evaluate(() => document.querySelector('[data-season-tabs]').scrollIntoView({ block: 'start', behavior: 'instant' }))
      await page.waitForTimeout(300)
    }
    if (s.chrome) await page.waitForTimeout(100)
    if (s.credits) {
      // Drag the timeline to the end: the credits roll and the Up Next card counts down.
      const box = await page.locator('[data-timeline]').boundingBox()
      await page.mouse.move(box.x + 4, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + box.width - 4, box.y + box.height / 2, { steps: 8 })
      await page.mouse.up()
      await page.waitForTimeout(2000)
    }
    await page.screenshot({ path: `${out}/${cls.name}-${s.name}.jpg`, type: 'jpeg', quality: 80 })
    console.log(`${cls.name} ${s.name}`)
  }
  await ctx.close()
}
await browser.close()
