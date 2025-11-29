import { buildRoutes } from '@/utils/index.js'
import { HealthRoutes } from '@/modules/health/index.js'
import { CornRoutes } from '@/modules/store/index.js'
import { AuthRoutes, UserRoutes } from '@/modules/auth/index.js'

export const router = buildRoutes(HealthRoutes)

buildRoutes([...AuthRoutes, ...UserRoutes, ...CornRoutes], {
  router,
})
