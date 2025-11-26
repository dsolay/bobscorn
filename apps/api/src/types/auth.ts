import type { UserModel } from '@/generated/prisma/models.js'
import type { JWTPayload } from 'jose'

export type AccessTokenPayload = JWTPayload & { permissions: string[] }

export interface JwtResponse {
  exp: number
  privileges: string[]
  user_id: number
  name: string
  last_name: string
  email: string
  phone: string
  iat: number
  profile: string
  gender: string
  photo: string
}

export interface Credentials {
  email: string
  password: string
}

export type JWTDecodeParams = {
  token: string
}

export type UserLogger = {
  name: string
  last_name: string
}

export interface AuthenticatedResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
  user: Pick<UserModel, 'id' | 'name' | 'lastname' | 'email'>
}
