import type { Routes } from '@/types/index.js'
import { HealthController } from '@/modules/health/index.js'

const prefix = 'healthcheck'

export const HealthRoutes: Routes[] = [
  {
    path: '/',
    method: 'get',
    prefix,
    auth: 'none',
    controller: HealthController.ping,
  },
]
