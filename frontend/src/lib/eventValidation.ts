export interface EventFormValues {
  Title: string
  Desc: string
  Address: string
  Date: string
  Strength: string
}

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>

const DATE_RE = /^(\d{2})-(\d{2})-(\d{4})$/

export function parseEventDate(value: string): Date | null {
  const match = DATE_RE.exec(value.trim())
  if (!match) return null
  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

function startOfToday(): Date {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}

function checkLength(
  value: string,
  label: string,
  min: number,
  max: number
): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return `${label} is required.`
  if (trimmed.length < min) {
    return `${label} must be at least ${min} characters.`
  }
  if (trimmed.length > max) {
    return `${label} must be ${max} characters or fewer.`
  }
  return undefined
}

export function validateEventForm(values: EventFormValues): EventFormErrors {
  const errors: EventFormErrors = {}

  const titleError = checkLength(values.Title, 'Title', 3, 100)
  if (titleError) errors.Title = titleError

  const descError = checkLength(values.Desc, 'Description', 10, 1000)
  if (descError) errors.Desc = descError

  const addressError = checkLength(values.Address, 'Address', 5, 200)
  if (addressError) errors.Address = addressError

  const dateRaw = values.Date.trim()
  if (!dateRaw) {
    errors.Date = 'Date is required.'
  } else {
    const parsed = parseEventDate(dateRaw)
    if (!parsed) {
      errors.Date = 'Enter a valid date in DD-MM-YYYY format.'
    } else if (parsed < startOfToday()) {
      errors.Date = 'The date cannot be in the past.'
    }
  }

  const strengthRaw = values.Strength.trim()
  if (!strengthRaw) {
    errors.Strength = 'Capacity is required.'
  } else if (!/^\d+$/.test(strengthRaw)) {
    errors.Strength = 'Enter a whole number of people.'
  } else {
    const strength = Number(strengthRaw)
    if (strength > 99999) {
      errors.Strength = 'Capacity must be 99,999 or fewer.'
    }
  }

  return errors
}

export function hasEventErrors(errors: EventFormErrors): boolean {
  return Object.keys(errors).length > 0
}

export function clearEventError(
  errors: EventFormErrors,
  key: keyof EventFormValues
): EventFormErrors {
  if (!errors[key]) return errors
  const next = { ...errors }
  delete next[key]
  return next
}
