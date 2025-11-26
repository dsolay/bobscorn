import type { AuthType } from '@/types/routes.js'
import type { RequestHandler } from 'express'
import { authBearer as bearer } from './bearer.middleware.js'
import { none } from './none.middleware.js'

export * from './bearer.middleware.js'
export * from './route-not-found.middleware.js'
export * from './error-handler.middleware.js'
export * from './refresh.middleware.js'
export * from './none.middleware.js'

export const mapAuthMiddlewares: Record<AuthType, RequestHandler> = {
  bearer,
  apiKey: () => {},
  none,
}
