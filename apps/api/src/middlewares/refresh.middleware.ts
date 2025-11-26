import type { Request, Response, NextFunction } from 'express'
import { MissingRefreshTokenError } from '@/errors/index.js'

function extractToken(request: Request) {
  let token: string | undefined

  if (request.cookies.refresh_token) token = request.cookies.refresh_token as string
  else token = request.header('x-refresh-token')

  if (!token) throw new MissingRefreshTokenError()

  return token
}

export function VerifyRefreshTokenMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const token = extractToken(request)

  request.user = { id: 1, refresToken: token }

  next()
}
