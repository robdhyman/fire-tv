export type Direction = 'up' | 'down' | 'left' | 'right'

export type Box = { id: string; left: number; top: number; right: number; bottom: number }

const centre = (b: Box) => ({ x: (b.left + b.right) / 2, y: (b.top + b.bottom) / 2 })

/**
 * Nearest neighbour in a direction, TV style.
 *
 * Vertical moves land on the nearest lane (the closest row of items in that
 * direction, with 40px of slack) and then the item in that lane nearest in x.
 * Horizontal moves prefer items that overlap the current one vertically and
 * fall back to the nearest item in that direction. Returns null to stay put.
 */
export function pickNeighbour(current: Box, boxes: Box[], dir: Direction): Box | null {
  const c = centre(current)
  const others = boxes.filter((b) => b.id !== current.id && b.right > b.left && b.bottom > b.top)

  if (dir === 'up' || dir === 'down') {
    const sign = dir === 'down' ? 1 : -1
    const list = others
      .map((b) => {
        const p = centre(b)
        return { b, dy: (p.y - c.y) * sign, dx: Math.abs(p.x - c.x) }
      })
      .filter((e) => e.dy > 8)
    if (list.length === 0) return null
    const minDy = Math.min(...list.map((e) => e.dy))
    const lane = list.filter((e) => e.dy <= minDy + 40)
    lane.sort((a, b) => a.dx - b.dx || a.dy - b.dy)
    return lane[0].b
  }

  const sign = dir === 'right' ? 1 : -1
  const list = others
    .map((b) => {
      const p = centre(b)
      return { b, dx: (p.x - c.x) * sign, dy: Math.abs(p.y - c.y) }
    })
    .filter((e) => e.dx > 8)
  if (list.length === 0) return null
  const overlapping = list.filter((e) => e.b.top < current.bottom - 4 && e.b.bottom > current.top + 4)
  const pool = overlapping.length > 0 ? overlapping : list
  pool.sort((a, b) => a.dx + a.dy * 3 - (b.dx + b.dy * 3))
  return pool[0].b
}
