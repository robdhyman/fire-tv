export type Direction = 'up' | 'down' | 'left' | 'right'

export type Box = { id: string; left: number; top: number; right: number; bottom: number }

const centre = (b: Box) => ({ x: (b.left + b.right) / 2, y: (b.top + b.bottom) / 2 })

/**
 * Nearest neighbour in a direction, TV style.
 *
 * Vertical moves land on the nearest lane (the closest row of items in that
 * direction, with 40px of slack) and then the item in that lane nearest in x.
 * Horizontal moves stay in the lane: only items that overlap the current one
 * vertically count. Returns null to stay put, which is an edge bump (ADR 004).
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
      // A centre inside the current item's span is beside it, not past it: the
      // focused tile lifts 8px, which the stage scales past the 8px slack above.
      .filter((e) => e.dy > 8 && (sign > 0 ? centre(e.b).y > current.bottom : centre(e.b).y < current.top))
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
    .filter((e) => e.dx > 8 && e.b.top < current.bottom - 4 && e.b.bottom > current.top + 4)
  if (list.length === 0) return null
  list.sort((a, b) => a.dx + a.dy * 3 - (b.dx + b.dy * 3))
  return list[0].b
}
