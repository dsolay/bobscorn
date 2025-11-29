import { randomBytes } from 'node:crypto'
import { SignJWT } from 'jose'
import { type AuthData, UserService } from '@/modules/auth/index.js'
import { RefreshTokenService } from '@/modules/auth/index.js'
import { authConfig, Environment } from '@/constants/index.js'
import { parseDuration } from '@/utils/index.js'
import dayjs from 'dayjs'
import type { AuthenticatedResponse } from '@/types/index.js'
import type { TransactionClient } from '@/generated/prisma/internal/prismaNamespace.js'

let instance: AuthService | undefined

export class AuthService {
  readonly #userService: UserService
  readonly #refreshTokenService: RefreshTokenService

  constructor() {
    this.#userService = UserService.getInstance()
    this.#refreshTokenService = RefreshTokenService.getInstance()
  }

  static getInstance() {
    instance ??= new AuthService()

    return instance
  }

  async issueAccessToken(userId: number) {
    const token = await new SignJWT()
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(userId.toString())
      .setIssuedAt()
      .setExpirationTime(authConfig.jwt.expirationTime)
      .sign(Environment.getInstance().jwtAccessSecret)

    const expiresIn = parseDuration(authConfig.jwt.expirationTime) / 1000

    return {
      access_token: token,
      token_type: 'Bearer',
      expires_in: expiresIn,
    }
  }

  async issueRefresToken(userId: number, tx?: TransactionClient) {
    const token = randomBytes(40).toString('hex')
    const expiresIn = parseDuration(authConfig.refreshToken.expiresAt) / 1000
    const expiresAt = new Date(Date.now() + expiresIn * 1000)

    await this.#refreshTokenService.save({ token, userId, expiresAt }, tx)

    return { refresh_token: token, refresh_expires_in: expiresIn }
  }

  async authenticate(credentials: AuthData): Promise<AuthenticatedResponse> {
    const user = await this.#userService.checkCredentials(credentials)

    const _user = await this.#userService.getUserDataToIssueToken(user.id)

    const accessToken = await this.issueAccessToken(user.id)
    const refreshToken = await this.issueRefresToken(user.id)

    return { ...accessToken, ...refreshToken, user: _user }
  }

  async refreshToken(userId: number, token: string) {
    const user = await this.#userService.getUserDataToIssueToken(userId)

    const { expires_in, ...data } = await this.issueAccessToken(user.id)

    const expiresAt = await this.#refreshTokenService.getExpiresAt(token)

    const expiresIn = dayjs(expiresAt).diff(dayjs(), 'seconds')

    return { ...data, expires_in: expiresIn }
  }
}
