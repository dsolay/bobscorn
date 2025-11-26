import express, { json, urlencoded } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import { parse } from 'qs'
import { routeNotFound, handleError } from '@/middlewares/index.js'
import { router } from '@/modules/index.js'
import { Environment } from '@/constants/index.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT ?? 3000

export class Application {
  app: express.Application

  constructor() {
    this.app = express()

    this.configure()

    this.middlewares()
    this.routes()
  }

  configure() {
    this.app.set('query parser', (query: string) => parse(query, { depth: 20 }))
  }

  middlewares() {
    this.app.use(json({ limit: '20mb' }))
    this.app.use(cookieParser())
    this.app.use(cors({
      origin: Environment.getInstance().origin,
      credentials: true,
    }))
    this.app.use(compression())

    this.app.use(helmet())
    this.app.use(urlencoded({ extended: false }))
  }

  routes() {
    this.app.use(router)

    this.app.use(routeNotFound)

    this.app.use(handleError)
  }

  start() {
    const server = this.app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log('Server is running at', PORT)
    })

    server.setTimeout(500_000)
  }
}
