import type { Routes } from '@/types/index.js'
import { CornController } from '@/modules/store/index.js'
import { OptionalTokenMiddleware } from '@/middlewares/index.js'

const prefix = 'corns'

export const CornRoutes: Routes[] = [
  {
    path: '/buy',
    method: 'post',
    prefix,
    auth: 'none',
    middlewares: [OptionalTokenMiddleware],
    controller: CornController.buy,
  },
  {
    path: '/history',
    method: 'post',
    prefix,
    auth: 'bearer',
    controller: CornController.history,
  },
]
