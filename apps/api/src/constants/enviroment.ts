import { loadEnvFile } from 'node:process'
import { z } from 'zod'

try {
  loadEnvFile()
} catch (error) {
  const { message } = error as Error

  // eslint-disable-next-line no-console
  console.log(message)
}

const envSchema = z.object({
  APP_DEBUG: z.string().optional(),
  DEBUG_QUERIES: z.string().optional(),
  JWT_ACCESS_SECRET: z.string(),
  ORIGINS: z.string().optional(),
  DEPLOY_TARGET: z.enum(['uat', 'production']).default('uat'),
  COOKIE_SAME_SITE: z.enum(['lax', 'strict', 'none']).default('lax'),
})

let instance: Environment | undefined

export class Environment {
  readonly #parsed: z.infer<typeof envSchema>

  constructor() {
    const schema = envSchema.parse(process.env)

    this.#parsed = schema
  }

  static getInstance() {
    instance ??= new Environment()

    return instance
  }

  get debug() {
    return this.#parsed.APP_DEBUG === 'true'
  }

  get debugQueries() {
    return this.#parsed.DEBUG_QUERIES === 'true'
  }

  get jwtAccessSecret() {
    return new TextEncoder().encode(this.#parsed.JWT_ACCESS_SECRET)
  }

  get isProduction() {
    return process.env.NODE_ENV === 'production'
  }

  get origin() {
    return this.#parsed.ORIGINS ?? '*'
  }

  get deployTarget() {
    return this.#parsed.DEPLOY_TARGET
  }

  get cookieSameSite() {
    return this.#parsed.COOKIE_SAME_SITE
  }

  get excludeRouteFromRateLimit() {
    return [/^\/users/, /^\/oauth/, /^\/corns\/history$/]
  }
}
