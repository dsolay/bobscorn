import express, { json, urlencoded } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import { parse } from 'qs'
import { rateLimit } from 'express-rate-limit'
import { routeNotFound, handleError } from '@/middlewares/index.js'
import { router } from '@/modules/index.js'
import { Environment } from '@/constants/index.js'
import cookieParser from 'cookie-parser'
import { CornRateLimitError } from './errors/index.js'
import { buildError } from './utils/index.js'

const PORT = process.env.PORT ?? 3000

export class Application {
  readonly #app: express.Application
  readonly #env: Environment

  constructor() {
    this.#app = express()
    this.#env = Environment.getInstance()

    this.configure()

    this.middlewares()
    this.routes()
  }

  configure() {
    this.#app.set('query parser', (query: string) => parse(query, { depth: 20 }))
  }

  middlewares() {
    this.#app.use(json({ limit: '20mb' }))
    this.#app.use(cookieParser())
    this.#app.use(
      cors({
        origin: this.#env.origin,
        credentials: true,
      }),
    )
    this.#app.use(compression())

    this.#app.use(helmet())
    this.#app.use(urlencoded({ extended: false }))
    this.#app.use(
      rateLimit({
        windowMs: 1 * 60 * 1000,
        limit: 1,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        skip: request =>
          this.#env.excludeRouteFromRateLimit.some(route => route.exec(request.path)),
        handler: (request, response) => {
          const error = new CornRateLimitError({ retryAfter: request.rateLimit.resetTime })
          const [_response, code] = buildError(error)

          response.status(code).json(_response)
        },
      }),
    )
  }

  routes() {
    this.#app.use(router)

    this.#app.use(routeNotFound)

    this.#app.use(handleError)
  }

  start() {
    const server = this.#app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log('Server is running at', PORT)
    })

    server.setTimeout(500_000)
  }
}
