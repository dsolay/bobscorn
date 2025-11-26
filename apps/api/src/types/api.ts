import type { AnyObject } from '@/types/index.js'

export type MicroserviceResponse<T = AnyObject> = {
  data: T
}

export interface FindParams {
  take?: number
  skip?: number
  cursor?: AnyObject
  select?: AnyObject
  where?: AnyObject
  include?: AnyObject
  orderBy?: AnyObject
}

export interface SingleApiResponse<T = AnyObject> {
  data: T
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  pageCount: number
}

export interface PaginatedApiResponse<T = AnyObject> {
  data: T[]
  pagination: Pagination
}
