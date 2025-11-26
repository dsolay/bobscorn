export interface Pagination {
  page: number
  pageSize: number
  total: number
  pageCount: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: Pagination
}
