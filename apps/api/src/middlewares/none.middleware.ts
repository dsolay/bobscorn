import type { NextFunction, Request, Response } from 'express'

export function none(_request: Request, _response: Response, next: NextFunction) {
  next()
}
