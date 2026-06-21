export function formatDateKey(dateInput) {
  const date = new Date(dateInput)

  if (Number.isNaN(date.getTime())) return null

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function formatDateKeyFromParts(year, month, day) {
  return `${String(day)}/${String(month)}/${year}`
}
