// Fails when docs/style-guide has drifted from the app's tokens, or links to a page that is not there.
// Run: npm run check:style-guide
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const css = readFileSync('src/index.css', 'utf8')
const motion = readFileSync('src/motion/tokens.ts', 'utf8')
const dir = 'docs/style-guide'
const pages = readdirSync(dir).filter((f) => f.endsWith('.md'))
const text = (name) => readFileSync(join(dir, name), 'utf8')
const all = pages.map(text).join('\n')

const errors = []
const expect = (page, needle, what) => {
  if (!text(page).includes(needle)) errors.push(`${page}: missing ${what} (${needle})`)
}

// Brand defaults live in @theme, the USA override in [data-brand="usa"].
const theme = css.match(/@theme \{([\s\S]*?)\n\}/)[1]
const usa = css.match(/\[data-brand="usa"\] \{([\s\S]*?)\n\}/)[1]
const v = (block, name) => block.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1].trim()

for (const [name, block, page] of [
  ['--color-page', theme, 'colour.md'],
  ['--color-rows', theme, 'colour.md'],
  ['--color-timeline', theme, 'colour.md'],
  ['--color-accent', theme, 'colour.md'],
  ['--color-accent', usa, 'colour.md'],
]) {
  const value = v(block, name)
  if (!value) errors.push(`index.css: ${name} not found`)
  else expect(page, value, `${name} ${value}`)
}
for (const [name, page] of [['--text-hero', 'typography.md'], ['--text-title', 'typography.md']]) {
  expect(page, `${v(theme, name)}`.replace('px', ' px'), `${name} (default)`)
  expect(page, `${v(usa, name)}`.replace('px', ''), `${name} (USA)`)
}

// Every named motion token appears on the motion page with its numbers.
for (const m of motion.matchAll(/^\s{2}(\w+): \{ type: 'spring', stiffness: (\d+), damping: (\d+), mass: ([\d.]+) \}/gm)) {
  expect('motion.md', `\`${m[1]}\` | ${m[2]} / ${m[3]} / ${m[4]}`, `spring ${m[1]}`)
}
const block = (name) => motion.match(new RegExp(`export const ${name} = \\{([\\s\\S]*?)\\} as const`))[1]
for (const m of block('duration').matchAll(/^\s{2}(\w+): ([\d.]+),/gm)) expect('motion.md', `\`${m[1]}\` | ${m[2]} |`, `duration ${m[1]}`)
for (const m of block('stagger').matchAll(/^\s{2}(\w+): ([\d.]+),/gm)) expect('motion.md', `\`stagger.${m[1]}\` | ${m[2]} s`, `stagger ${m[1]}`)
for (const m of block('distance').matchAll(/^\s{2}(\w+): (-?[\d.]+),/gm)) expect('motion.md', `\`distance.${m[1]}\` | ${m[2]}`, `distance ${m[1]}`)

// Internal links resolve to a page.
for (const m of all.matchAll(/\]\(\/docs\/style-guide(?:\/([\w-]+))?(?:#[\w-]+)?\)/g)) {
  const target = m[1] ? `${m[1]}.md` : 'index.md'
  if (!existsSync(join(dir, target))) errors.push(`broken link: /docs/style-guide/${m[1] ?? ''}`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`style guide matches the app tokens (${pages.length} pages)`)
