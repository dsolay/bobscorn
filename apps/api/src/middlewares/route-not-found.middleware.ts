import type { NextFunction, Request, Response } from 'express'
import { APP_ERROR, HTTP_STATUS } from '@/constants/index.js'
import { i18n } from '@/locales/index.js'
import type { ErrorResponse } from '@/types/index.js'

export function routeNotFound(request: Request, response: Response, _next: NextFunction) {
  const status = HTTP_STATUS.NOT_FOUND
  const _response: ErrorResponse = {
    error: {
      message: i18n('errors.routeNotFound', request.url),
      code: APP_ERROR.ROUTE_NOT_FOUND,
      type: 'RouteNotFoundError',
    },
  }

  response.status(status).json(_response)
}
