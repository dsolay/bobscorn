import { buildRoutes } from '@/utils/index.js'
import { HealthRoutes } from '@/modules/health/index.js'

export const router = buildRoutes(HealthRoutes)

buildRoutes([], {
  router,
})
