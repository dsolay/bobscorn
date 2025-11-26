import type { IRouter, RequestHandler, Router } from 'express'

export type Methods = Pick<
  IRouter,
  'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'
>

export const AuthType = {
  BEARER: 'bearer',
  API_KEY: 'apiKey',
  NONE: 'none',
} as const

export type AuthType = (typeof AuthType)[keyof typeof AuthType]

export interface Routes {
  path: string
  method: keyof Methods
  middlewares?: RequestHandler[]
  prefix?: string
  auth?: AuthType
  permissions?: string[]
  controller: RequestHandler
}

export interface RouteOptions {
  prefix?: string
  router?: Router
}
