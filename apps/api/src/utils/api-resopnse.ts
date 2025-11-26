import type { Response } from 'express'
import { HTTP_STATUS } from '@/constants/index.js'
import type { AnyObject, PaginatedResult } from '@/types/index.js'

export function paginatedResponse<T>(response: Response, records: PaginatedResult<T>) {
  return response
    .status(HTTP_STATUS.OK)
    .json({ data: records.data, meta: { pagination: records.pagination } })
}

export function singleResponse(response: Response, data: unknown, meta?: AnyObject) {
  return response.status(HTTP_STATUS.OK).json({ data, meta })
}

export function noContentResponse(response: Response) {
  return response.status(HTTP_STATUS.NO_CONTENT).json({})
}
