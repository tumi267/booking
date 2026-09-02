import type { BookedDay } from '@/app/types/booking'

/**
 * Normalises a date to local midnight.
 */
export function startOfLocalDay(date: Date): Date {
  const result = new Date(date)

  result.setHours(0, 0, 0, 0)

  return result
}

/**
 * Converts a Date into YYYY-MM-DD.
 */
export function formatLocalDate(date: Date): string {
  const year = date.getFullYear()

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0')

  const day = String(
    date.getDate()
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Converts YYYY-MM-DD into a local Date.
 *
 * We intentionally do not use new Date('YYYY-MM-DD')
 * because that is parsed as UTC.
 */
export function parseLocalDate(
  dateString: string
): Date {
  const [
    year,
    month,
    day,
  ] = dateString.split('-').map(Number)

  return startOfLocalDay(
    new Date(
      year,
      month - 1,
      day
    )
  )
}

/**
 * Checks whether two dates represent
 * the same local calendar day.
 */
export function isSameLocalDay(
  first: Date,
  second: Date
): boolean {
  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  )
}

/**
 * Returns the number of days in a month.
 */
export function getDaysInMonth(
  year: number,
  month: number
): number {
  return new Date(
    year,
    month + 1,
    0
  ).getDate()
}

/**
 * Returns every valid day inside a range.
 */
export function buildDateRange(
  start: Date,
  end: Date,
  isDisabled: (date: Date) => boolean
): BookedDay[] {
  const range: BookedDay[] = []

  const current =
    startOfLocalDay(start)

  const finalDate =
    startOfLocalDay(end)

  while (current <= finalDate) {
    if (!isDisabled(current)) {
      range.push({
        date: formatLocalDate(current),
        times: [],
        dayOfWeek: current.getDay(),
      })
    }

    current.setDate(
      current.getDate() + 1
    )
  }

  return range
}