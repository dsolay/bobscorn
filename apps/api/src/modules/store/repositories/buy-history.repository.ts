import { PAGINATION } from '@/constants/index.js'
import type {
  BuyHistoryCreateArgs,
  BuyHistoryFindFirstArgs,
  BuyHistoryFindManyArgs,
  BuyHistoryUpdateArgs,
} from '@/generated/prisma/models.js'
import { prisma } from '@db'
import type { TransactionClient } from '@/generated/prisma/internal/prismaNamespace.js'

let instance: BuyHistoryRepository | undefined

export class BuyHistoryRepository {
  static getInstance() {
    instance ??= new BuyHistoryRepository()

    return instance
  }

  async findMany(parameters?: BuyHistoryFindManyArgs) {
    const limit = parameters?.take ?? PAGINATION.LIMIT
    const skip = parameters?.skip ?? 0
    const page = skip === 0 ? 1 : skip / limit + 1

    parameters = { ...parameters, take: limit, skip }

    const [count, data] = await Promise.all([
      prisma.buyHistory.count({ where: parameters.where }),
      prisma.buyHistory.findMany(parameters),
    ])

    return {
      data,
      pagination: { page, pageSize: limit, total: count, pageCount: Math.ceil(count / limit) },
    }
  }

  findOne(parameters: BuyHistoryFindFirstArgs) {
    return prisma.buyHistory.findFirst(parameters)
  }

  create(data: BuyHistoryCreateArgs['data'], tx?: TransactionClient) {
    const _prisma = tx ?? prisma

    return _prisma.buyHistory.create({ data, select: { id: true } })
  }

  update(id: number, data: BuyHistoryUpdateArgs['data']) {
    return prisma.buyHistory.update({ where: { id }, data, select: { id: true } })
  }

  delete(id: number) {
    return prisma.buyHistory.delete({ where: { id }, select: { id: true } })
  }
}
