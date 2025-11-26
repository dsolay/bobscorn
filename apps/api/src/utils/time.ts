export function getProcessingTimeInMS(time: [number, number]) {
  return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}

export function parseDuration(duration: string): number {
  const match = /^(\d+)([smhd])$/.exec(duration)

  if (!match)
    throw new Error('Formato inválido. Usa números seguidos de s, m, h o d (ej: "15m")')

  const value = Number.parseInt(match[1], 10)
  const unit = match[2]

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
  }

  return value * multipliers[unit]
}
