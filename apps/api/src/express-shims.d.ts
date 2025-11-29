export {}

declare global {
  namespace Express {
    export interface Request {
      rateLimit: {
        resetTime: Date
      }
      user?: {
        id: number
        refresToken?: strnig
      }
    }
  }
}
