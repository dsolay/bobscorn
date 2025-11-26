export function roundTwo(number: number) {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

export function roundToNearestMultiple(number: number, multiple = 5) {
  return Math.ceil(number / multiple) * multiple
}

export function getRandomNumber(length: number) {
  const min = Math.pow(10, length - 1)
  const max = Math.pow(10, length)

  // eslint-disable-next-line sonarjs/pseudo-random
  return Math.floor(Math.random() * (max - min) + min)
}

export function megabytesToBytes(megabytes: number): number {
  return megabytes * 1024 * 1024
}
