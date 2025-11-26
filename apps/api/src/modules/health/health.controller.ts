import type { Request, RequestHandler, Response } from 'express'
import { singleResponse } from '@/utils/index.js'

export const HealthController = {
  ping: (_request: Request, response: Response) => {
    const message = 'The system is healthy'
    singleResponse(response, { message })
  },
} as const satisfies Record<string, RequestHandler>
