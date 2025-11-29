import { ZodError } from 'zod'
import { i18n } from '@/locales/index.js'
import { APP_ERROR, HTTP_STATUS } from '@/constants/index.js'
import type { ID, AnyObject, ErrorLevel } from '@/types/index.js'
import { BaseError } from '@/errors/index.js'

export class ModelNotFoundError extends BaseError {
  constructor(model: string, id?: ID, level: ErrorLevel = 'error') {
    const message = id
      ? i18n('errors.entityWithIdNotFound', model, id)
      : i18n('errors.entityNotFound', model)

    super(message, 'ModelNotFoundError', {}, level)

    this.errorCode = APP_ERROR.MODEL_NOT_FOUND
    this.httpError = HTTP_STATUS.NOT_FOUND
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    const _message = message ?? i18n('errors.unauthorized')

    super(_message, 'UnauthorizedError', {})

    this.errorCode = APP_ERROR.UNAUTHORIZED
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class NotImplementedError extends BaseError {
  constructor() {
    const message = i18n('errors.notImplemented')

    super(message, 'NotImplementedError', {})

    this.errorCode = APP_ERROR.NOT_IMPLEMENTED
    this.httpError = HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}

export class ForbiddenError extends BaseError {
  constructor() {
    const message = i18n('errors.forbidden')

    super(message, 'ForbiddenError', {})

    this.errorCode = APP_ERROR.FORBIDDEN
    this.httpError = HTTP_STATUS.FORBIDDEN
  }
}

export class EmptyTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.emptyToken')

    super(_message, 'EmptyTokenError', {})

    this.errorCode = APP_ERROR.EMPTY_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class InvalidTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.invalidToken')

    super(_message, 'InvalidTokenError', {})

    this.errorCode = APP_ERROR.INVALID_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class ValidationError extends BaseError {
  constructor(error?: ZodError | AnyObject) {
    const _message = i18n('errors.invalidPayload')
    const details = error instanceof ZodError ? { errors: error.issues } : error

    super(_message, 'ValidationError', details)

    this.errorCode = APP_ERROR.INVALID_PAYLOAD
    this.httpError = HTTP_STATUS.UNPROCESSABLE_ENTITY
  }
}

export class PrismaError extends BaseError {
  constructor(details: AnyObject) {
    super(i18n('errors.prismaError'), 'PrismaError', details)

    this.errorCode = APP_ERROR.PRISMA_ERROR
    this.httpError = HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}

export class ExpiredTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.tokenExpired')

    super(_message, 'ExpiredTokenError', {})

    this.errorCode = APP_ERROR.EXPIRED_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class BadCredentialsError extends BaseError {
  constructor() {
    const _message = i18n('errors.badCredentials')

    super(_message, 'BadCredentialsError', {})

    this.errorCode = APP_ERROR.BAD_CREDENTIALS
    this.httpError = HTTP_STATUS.BAD_REQUEST
  }
}

export class InvalidRefreshTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.invalidRefreshToken')

    super(_message, 'InvalidRefreshTokenError', {})

    this.errorCode = APP_ERROR.INVALID_REFRESH_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class ExpiredRefreshTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.expiredRefreshToken')

    super(_message, 'ExpiredRefreshTokenError', {})

    this.errorCode = APP_ERROR.EXPIRED_REFRESH_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class MissingRefreshTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.missingRefreshToken')

    super(_message, 'MissingRefreshTokenError', {})

    this.errorCode = APP_ERROR.MISSING_REFRESH_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class CornRateLimitError extends BaseError {
  constructor(details: AnyObject = {}) {
    const _message = i18n('errors.cornRateLimit')

    super(_message, 'CornRateLimitError', details)

    this.errorCode = APP_ERROR.CORN_RATE_LIMIT
    this.httpError = HTTP_STATUS.TOO_MANY_REQUEST
  }
}
