import { inject, unref } from 'vue'

export function formatText(name) {
  // Replace all capital letters with a space and the lowercase letter
  const formattedName = name.replace(/([A-Z])/g, ' $1').trim()
  // Capitalize the first letter
  return formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
}

export function formatbase4ToImage(base64) {
  return `data:image/png;base64,${base64}`
}

export function localDate(dateString) {
  return new Date(dateString.slice(0, 10).replaceAll('-', '/')) // replace - with / in ISO date to avoid UTC conversion
}

export function formatDateISO(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

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
