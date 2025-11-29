export interface History {
  id: number
  quantity: number
  total: number
  date: Date
}

export interface User {
  id: number
  name: string
  lastname: string
  email: string
}

export interface CornHistory {
  id: number
  quantity: number
  total: number
  userId: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface CornHistoryDto {
  quantity: number
  total: number
  date: string
}
