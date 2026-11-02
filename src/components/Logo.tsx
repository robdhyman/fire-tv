import type { Brand } from '../data/catalogue'

/** Brand mark, drawn in the brand's own face. Historical context only. */
export function Logo({ brand }: { brand: Brand }) {
  if (brand === 'usa') {
    return (
      <span
        className="flex h-[46px] w-[78px] items-center justify-center rounded-[3px] bg-accent text-[30px] font-bold lowercase leading-none tracking-tight text-white"
        style={{ fontFamily: 'Montserrat' }}
      >
        usa
      </span>
    )
  }
  return (
    <span
      className="inline-block text-[34px] font-extrabold uppercase leading-none tracking-[0.02em] text-accent"
      style={{ fontFamily: '"Barlow Condensed"', transform: 'skewX(-6deg)' }}
    >
      SYFY
    </span>
  )
}
