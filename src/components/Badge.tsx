/** Corner tag on a tile: `new` or `expiring`. */
export function Badge({ kind }: { kind: 'new' | 'expiring' }) {
  return (
    <span className="absolute right-0 top-0 bg-black/55 px-[12px] py-[6px] text-[19px] font-light leading-none text-white">
      {kind}
    </span>
  )
}
