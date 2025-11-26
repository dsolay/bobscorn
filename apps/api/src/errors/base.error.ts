import { APP_ERROR, HTTP_STATUS } from '@/constants/index.js'
import type { AnyObject, ErrorLevel } from '@/types/index.js'

export class BaseError extends Error {
  readonly #_details: AnyObject
  #_httpError: HTTP_STATUS = HTTP_STATUS.INTERNAL_SERVER_ERROR
  #_errorCode: number = APP_ERROR.UNKNOWN_ERROR
  #error: Error | undefined
  #_level: ErrorLevel = 'error'

  constructor(
    message: string,
    name: string,
    details: AnyObject = {},
    level: ErrorLevel = 'error',
    error?: Error,
  ) {
    super()
    this.name = name
    this.message = message
    this.#_details = details
    this.#error = error
    this.#_level = level
  }

  get details(): AnyObject {
    return this.#_details
  }

  get httpError(): HTTP_STATUS {
    return this.#_httpError
  }

  set httpError(error: HTTP_STATUS) {
    this.#_httpError = error
  }

  set errorCode(code: number) {
    this.#_errorCode = code
  }

  get errorCode() {
    return this.#_errorCode
  }

  get error() {
    return this.#error
  }

  set error(value: Error | undefined) {
    this.#error = value
  }

  get level() {
    return this.#_level
  }

  set level(value: ErrorLevel) {
    this.#_level = value
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      details: this.details,
      level: this.#_level,
    }
  }
}
