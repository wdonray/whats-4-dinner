import { inject, unref } from 'vue'

export function formatText(name) {
  // Replace all capital letters with a space and the lowercase letter
  const formattedName = name.replace(/([A-Z])/g, ' $1').trim()
  // Capitalize the first letter
  return formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
}

export function formatbase64ToImage(base64) {
  return `data:image/png;base64,${base64}`
}

export function localDate(dateString) {
  return new Date(dateString.slice(0, 10).replaceAll('-', '/'))
}

export function formatDateISO(date) {
  const monthOffset = 1 // Months in JS are 0-11

  const d = new Date(date)
  let day = String(d.getDate())
  let month = String(d.getMonth() + monthOffset)
  let year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function toLocaleDateString(dateString, options) {
  if (!dateString) return ''
  if (dateString instanceof Date) dateString = formatDateISO(dateString)
  const locale = inject('locale', 'en')
  const date = localDate(dateString)
  return date.toLocaleDateString(unref(locale), options)
}

export function formatDate(dateString) {
  return toLocaleDateString(dateString)
}

export function formatDateFull(dateString) {
  return toLocaleDateString(dateString, { dateStyle: 'full' })
}
