import { ZodError } from 'zod'
import { i18n } from '@/locales/index.js'
import { APP_ERROR, HTTP_STATUS } from '@/constants/index.js'
import type { ID, AnyObject, ErrorLevel, ErrorResponse } from '@/types/index.js'
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

export class UploadFileError extends BaseError {
  constructor() {
    const message = i18n('errors.upload.file')
    super(message, 'UploadFileError', {})
    this.errorCode = APP_ERROR.FILE_UPLOAD_ERROR
    this.httpError = HTTP_STATUS.INTERNAL_SERVER_ERROR
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

export class UnsupportedContentTypeError extends BaseError {
  constructor(error?: ZodError | AnyObject) {
    const _message = i18n('errors.invalidPayload')
    const details = error instanceof ZodError ? { errors: error.issues } : error

    super(_message, 'UnsupportedContentTypeError', details)

    this.errorCode = APP_ERROR.UNSUPPORTED_CONTENT_TYPE
    this.httpError = HTTP_STATUS.UNSUPPORTED_CONTENT_TYPE
  }
}

export class PrismaError extends BaseError {
  constructor(details: AnyObject) {
    super(i18n('errors.prismaError'), 'PrismaError', details)

    this.errorCode = APP_ERROR.PRISMA_ERROR
    this.httpError = HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}

export class MicroserviceError extends BaseError {
  constructor(details: ErrorResponse['error']) {
    const _message = i18n('errors.microservice')

    super(_message, 'MicroserviceError', details)

    this.errorCode = APP_ERROR.MICROSERVICE_ERROR
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

export class UnknownClientError extends BaseError {
  constructor() {
    const _message = i18n('errors.unknownClient')

    super(_message, 'UnknownClientError', {})

    this.errorCode = APP_ERROR.UNKNOWN_CLIENT
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

export class InvalidTwoFaError extends BaseError {
  constructor() {
    const _message = i18n('errors.invalidTwofaCode')

    super(_message, 'InvalidTwoFaError', {})

    this.errorCode = APP_ERROR.INVALID_TWOFA_CODE
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

export class FolderWriteDeniedError extends BaseError {
  constructor(resourceId: number) {
    const _message = i18n('errors.folderWriteDenied')

    super(_message, 'FolderWritePermissionDeniedError', {
      requiredPermission: 'write',
      resourceType: 'folder',
      resourceId,
    })

    this.errorCode = APP_ERROR.FOLDER_WRITE_DENIED
    this.httpError = HTTP_STATUS.FORBIDDEN
  }
}

export class FileDeleteDeniedError extends BaseError {
  constructor(resourceId: number) {
    const _message = i18n('errors.fileDeleteDenied')

    super(_message, 'FileDeleteDeniedError', {
      requiredPermission: 'delete',
      resourceType: 'file',
      resourceId,
    })

    this.errorCode = APP_ERROR.FILE_DELETE_DENIED
    this.httpError = HTTP_STATUS.FORBIDDEN
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor() {
    const _message = i18n('errors.resourceNotFound')

    super(_message, 'ResourceNotFoundError', {})

    this.errorCode = APP_ERROR.RESOURCE_NOT_FOUND
    this.httpError = HTTP_STATUS.NOT_FOUND
  }
}

export class UnsupportedFileFormatError extends BaseError {
  constructor(allowedFormats: string[]) {
    const _message = i18n('errors.unsupportedFormats')

    super(_message, 'UnsupportedFileFormatError', { allowedFormats })

    this.errorCode = APP_ERROR.UNSUPPORTED_CONTENT_TYPE
    this.httpError = HTTP_STATUS.UNSUPPORTED_CONTENT_TYPE
  }
}

export class MfaTokenValidationError extends BaseError {
  constructor() {
    const _message = i18n('errors.mfaTokenVlidation')

    super(_message, 'MfaTokenValidationError')

    this.errorCode = APP_ERROR.MFA_TOKEN_VALIDATION
    this.httpError = HTTP_STATUS.BAD_REQUEST
  }
}

export class TotpResetNotFoundError extends BaseError {
  constructor() {
    const _message = i18n('errors.totpResetNotFound')

    super(_message, 'TotpResetNotFoundError')

    this.errorCode = APP_ERROR.TOTP_RESET_NOT_FOUND
    this.httpError = HTTP_STATUS.CONFLICT
  }
}

export class NonEmptyFolderError extends BaseError {
  constructor() {
    const _message = i18n('errors.nonEmptyFolder')

    super(_message, 'NonEmptyFolderError')

    this.errorCode = APP_ERROR.NON_EMPTY_FOLDER
    this.httpError = HTTP_STATUS.CONFLICT
  }
}

export class EntityInUseError extends BaseError {
  constructor() {
    const _message = i18n('errors.entityInUse')

    super(_message, 'EntityInUseError')

    this.errorCode = APP_ERROR.ENTITY_IN_USE
    this.httpError = HTTP_STATUS.CONFLICT
  }
}
