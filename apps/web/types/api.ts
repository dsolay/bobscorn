export type ErrorLevel = 'error' | 'warn' | 'info' | 'hidden'

export interface ErrorResponse {
  error: {
    message: string
    code: number
    type: string
    details?: Record<string, unknown>
    stack?: string[]
    level?: ErrorLevel
  }
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  pageCount: number
}

export interface ApiResponse<T> {
  data: T
}

export interface PaginatedApiResponse<T> {
  data: T[]
  meta: {
    pagination: Pagination
  }
}

export interface FindParams {
  take?: number
  skip?: number
  cursor?: Record<string, unknown>
  select?: Record<string, unknown>
  where?: Record<string, unknown>
  include?: Record<string, unknown>
  orderBy?: Record<string, unknown>
}
