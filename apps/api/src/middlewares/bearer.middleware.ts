import type { NextFunction, Request, Response } from 'express'
import { EmptyTokenError, InvalidTokenError, ExpiredTokenError } from '@/errors/index.js'
import { errors, jwtVerify } from 'jose'
import { Environment } from '@/constants/index.js'
import type { AccessTokenPayload } from '@/types/index.js'

function extractToken(request: Request) {
  let token: string | undefined

  if (request.cookies.access_token) token = request.cookies.access_token as string
  else token = request.header('authorization')

  if (!token || token === 'Bearer undefined') throw new EmptyTokenError()

  return token.replace(/^Bearer\s+/i, '')
}

export async function authBearer(request: Request, _response: Response, next: NextFunction) {
  const token = extractToken(request)

  try {
    const result = await jwtVerify<AccessTokenPayload>(
      token,
      Environment.getInstance().jwtAccessSecret,
    )

    request.user = {
      id: Number(result.payload.sub),
    }

    next()
  } catch (error) {
    if (error instanceof errors.JWTExpired) throw new ExpiredTokenError()
    if (error instanceof errors.JWSSignatureVerificationFailed) throw new InvalidTokenError()

    throw error
  }
}
