import { Router, type RequestHandler } from 'express'
import { AuthType, type RouteOptions, type Routes } from '@/types/index.js'
import { mapAuthMiddlewares } from '@/middlewares/index.js'

function buildMiddlewares(route: Routes): RequestHandler[] {
  const middlewares: RequestHandler[] = []

  const auth = route.auth ?? AuthType.BEARER

  const authMiddleware = mapAuthMiddlewares[auth]
  if (authMiddleware) middlewares.push(authMiddleware)

  if (route.middlewares) middlewares.push(...route.middlewares)

  return middlewares
}

export function buildRoutes(routes: Routes[], options?: RouteOptions): Router {
  const router = options?.router ?? Router()

  for (const route of routes) {
    const path = ['', options?.prefix, route.prefix, route.path.replace(/^\//, '')]
      .filter(item => item !== undefined)
      .join('/')

    const middlewares = buildMiddlewares(route)

    router[route.method](path, middlewares, route.controller)
  }

  return router
}
