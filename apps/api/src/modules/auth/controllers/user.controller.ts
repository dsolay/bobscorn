import type { RequestHandler } from 'express'
import {
  UserService,
  RegisterSchema,
  UserUpdateSchema,
  PasswordSchema,
} from '@/modules/auth/index.js'
import { noContentResponse, paginatedResponse, singleResponse } from '@/utils/index.js'
import { UserFindManyArgsSchema } from '@/generated/zod/index.js'

export const UserController = {
  find: async (request, response) => {
    const parameters = UserFindManyArgsSchema.parse(request.body)

    const entities = await UserService.getInstance().find(parameters)

    paginatedResponse(response, entities)
  },
  me: async (request, response) => {
    const userId = request.user?.id as number

    const entity = await UserService.getInstance().me(userId)

    singleResponse(response, entity)
  },
  register: async (request, response) => {
    const body = RegisterSchema.parse(request.body)

    await UserService.getInstance().register(body.data)

    noContentResponse(response)
  },
  update: async (request, response) => {
    const id = Number(request.params.id)
    const body = UserUpdateSchema.parse(request.body)

    if (body.data.password) PasswordSchema.parse(body.data.password)

    await UserService.getInstance().update(id, body.data)

    noContentResponse(response)
  },
  delete: async (request, response) => {
    const id = Number(request.params.id)

    await UserService.getInstance().delete(id)

    noContentResponse(response)
  },
} as const satisfies Record<string, RequestHandler>
