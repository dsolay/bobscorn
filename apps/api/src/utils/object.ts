import { inspect } from 'node:util'
import type { AnyObject, KeyMapper } from '@/types/index.js'

export const isObject = (value: unknown): value is AnyObject => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isEmptyObject(object: unknown): boolean {
  if (!object) return true
  return Object.entries(object).length === 0
}

export const getObjectProperty = (object: unknown, path: string): unknown => {
  if (!object || typeof path !== 'string') return undefined

  const parts = path.split('.')
  return parts.reduce<unknown>((current, key) => {
    if (current && isObject(current) && key in current) return current[key]

    return undefined
  }, object)
}

export function print(object: unknown) {
  // eslint-disable-next-line no-console
  console.log(inspect(object, false, null, true))
}

export function trimProperties<T extends AnyObject>(object: T): T {
  const result: AnyObject = {}

  for (const [key, value] of Object.entries(object as AnyObject)) {
    if (typeof value === 'string') result[key] = value.trim()
    else if (typeof value === 'object') result[key] = trimProperties(value as AnyObject)
  }

  return result as T
}

export function mapKeys<T = AnyObject>(
  object: Record<string, T>,
  keyMapper: KeyMapper<T>,
): Record<string, T> {
  return Object.keys(object).reduce((result: Record<string, T>, key: string) => {
    result[keyMapper(object[key], key, object)] = object[key]
    return result
  }, {})
}
