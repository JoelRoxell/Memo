/**
 * Get current time stamp in [hh, mm, ss] string-format.
 */
export function getTime(): [string, string, string] {
  const now = new Date()

  const [hh, mm, ss] = now
    .toTimeString()
    .split(' ')[0]
    .split(':')

  return [hh, mm, ss]
}
