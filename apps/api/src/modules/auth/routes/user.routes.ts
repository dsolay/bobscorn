import type { Routes } from '@/types/index.js'
import { UserController } from '@/modules/auth/index.js'

const prefix = 'users'

export const UserRoutes: Routes[] = [
  {
    path: '/find',
    method: 'post',
    prefix,
    controller: UserController.find,
  },
  {
    path: '/me',
    method: 'get',
    prefix,
    controller: UserController.me,
  },
  {
    path: '/register',
    method: 'post',
    prefix,
    auth: 'none',
    controller: UserController.register,
  },
  {
    path: '/:id',
    method: 'put',
    prefix,
    controller: UserController.update,
  },
  {
    path: '/:id',
    method: 'delete',
    prefix,
    controller: UserController.delete,
  },
]
