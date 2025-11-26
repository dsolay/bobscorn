import crypto from 'node:crypto'

export function sleep(ms: number): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function unique(): string {
  // eslint-disable-next-line sonarjs/pseudo-random
  return Math.floor(Math.random() * Date.now()).toString()
}

export function isDefined(value: unknown) {
  return value !== undefined && value !== null
}

export function secureCompare(a: string, b: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(a),
    Buffer.from(b),
  )
}
