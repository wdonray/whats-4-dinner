export function sortByNumber(a, b, asc = true) {
  if (!asc) return b - a
  return a - b
}

export function sortByString(a, b, asc = true) {
  if (!asc) return b.localeCompare(a)
  return a.localeCompare(b)
}

export function sortByDate(a, b, asc = true) {
  if (!asc) return new Date(b) - new Date(a)
  return new Date(a) - new Date(b)
}
