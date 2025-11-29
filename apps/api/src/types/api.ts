import type { AnyObject, Pagination } from '@/types/index.js'

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

export interface PaginatedApiResponse<T = AnyObject> {
  data: T[]
  pagination: Pagination
}
