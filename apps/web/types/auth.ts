import type { User } from '~~/types'

export interface Credentials {
  email: string
  password: string
}

export interface LoginData {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
  user: User
}
