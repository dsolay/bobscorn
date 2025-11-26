import type { ErrorResponse } from '@/types/index.js'

export interface InfoLog {
  [key: string]: unknown
}

export interface LogDetails {
  level: 'error' | 'info' | 'warn'
  data: ErrorResponse | InfoLog
  message: string
}
