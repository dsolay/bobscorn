import type { Routes } from '@/types/index.js'
import { AuthController } from '@/modules/auth/index.js'
import { VerifyRefreshTokenMiddleware } from '@/middlewares/index.js'

const prefix = 'oauth'

export const AuthRoutes: Routes[] = [
  {
    path: '/token',
    method: 'post',
    prefix,
    auth: 'none',
    controller: AuthController.token,
  },
  {
    path: '/refresh-token',
    method: 'post',
    prefix,
    auth: 'none',
    middlewares: [VerifyRefreshTokenMiddleware],
    controller: AuthController.refreshToken,
  },
  {
    path: '/logout',
    method: 'post',
    prefix,
    auth: 'none',
    middlewares: [VerifyRefreshTokenMiddleware],
    controller: AuthController.logout,
  },
]
