import type { RequestHandler } from 'express'
import { noContentResponse, singleResponse } from '@/utils/index.js'
import { AuthSchema, AuthService, RefreshTokenService } from '@/modules/auth/index.js'
import { Environment } from '@/constants/index.js'

export const AuthController = {
  token: async (request, response) => {
    const body = AuthSchema.parse(request.body)

    const data = await AuthService.getInstance().authenticate(body)

    response.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: Environment.getInstance().isProduction,
      sameSite: Environment.getInstance().cookieSameSite,
      maxAge: data.refresh_expires_in * 1000,
    })

    response.cookie('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: Environment.getInstance().isProduction,
      sameSite: Environment.getInstance().cookieSameSite,
      maxAge: data.refresh_expires_in * 1000,
      path: '/oauth',
    })

    singleResponse(response, data)
  },
  refreshToken: async (request, response) => {
    const data = await AuthService.getInstance().refreshToken(
      request.user?.id as number,
      request.user?.refresToken as string,
    )

    response.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: Environment.getInstance().isProduction,
      sameSite: Environment.getInstance().cookieSameSite,
      maxAge: data.expires_in * 1000,
    })

    singleResponse(response, data)
  },
  logout: async (request, response) => {
    await RefreshTokenService.getInstance().deleteForCurrentSession(request.user?.refresToken as string)

    response.clearCookie('access_token', {
      httpOnly: true,
      secure: Environment.getInstance().isProduction,
      sameSite: Environment.getInstance().cookieSameSite,
      maxAge: 0,
    })

    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: Environment.getInstance().isProduction,
      sameSite: Environment.getInstance().cookieSameSite,
      maxAge: 0,
      path: '/oauth/refresh-token',
    })

    response.clearCookie('twofa_token', {
      httpOnly: true,
      secure: Environment.getInstance().isProduction,
      sameSite: Environment.getInstance().cookieSameSite,
      maxAge: 0,
      path: '/oauth/twofa',
    })

    noContentResponse(response)
  },
} as const satisfies Record<string, RequestHandler>
