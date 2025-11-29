import { paginatedResponse, singleResponse } from '@/utils/index.js'
import type { RequestHandler } from 'express'
import { BuyCornDtoSchema, BuyHistoryService } from '@/modules/store/index.js'
import { BuyHistoryFindManyArgsSchema } from '@/generated/zod/index.js'

export const CornController = {
  buy: async (request, response) => {
    const user = request.user

    if (user) {
      const service = BuyHistoryService.getInstance()
      const body = BuyCornDtoSchema.parse(request.body)

      await service.save({
        userId: user.id,
        quantity: body.data.quantity,
        total: body.data.total,
        createdAt: body.data.date,
      })
    }

    singleResponse(response, {})
  },
  history: async (request, response) => {
    const user = request.user

    const service = BuyHistoryService.getInstance()
    const parameters = BuyHistoryFindManyArgsSchema.parse(request.body)

    parameters.where = { userId: user?.id }
    const entities = await service.find(parameters)

    paginatedResponse(response, entities)
  },
} as const satisfies Record<string, RequestHandler>
