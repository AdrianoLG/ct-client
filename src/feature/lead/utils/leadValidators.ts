export function isRequired(
  value: string | number | boolean | null | undefined
) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  return false
}

export function isValidEmail(value: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date <= today
}
