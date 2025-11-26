import { format } from 'node:util'
import { z } from 'zod'
import type { AnyObject } from '@/types/index.js'
import { getObjectProperty } from '@/utils/index.js'
import { es } from './es.js'

export type Locales = {
  es: AnyObject
}

const LocaeSchema = z.enum(['es']) satisfies z.ZodType<keyof Locales>

const locale: keyof Locales = 'es'

export const locales: Locales = { es }

const getLocale = () => {
  const _locale = LocaeSchema.parse(locale)

  return locales[_locale]
}

export const i18n = (key: string, ...parameters: unknown[]): string => {
  const message = getObjectProperty(getLocale(), key) as string

  if (parameters.length > 0) return format(message, ...parameters).replaceAll('--', '')

  return message
}

export const localeValue = (key: string): unknown => {
  return getObjectProperty(getLocale(), key)
}
