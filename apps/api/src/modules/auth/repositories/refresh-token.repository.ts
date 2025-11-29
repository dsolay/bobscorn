import { PAGINATION } from '@/constants/index.js'
import type {
  RefreshTokenCreateArgs,
  RefreshTokenFindFirstArgs,
  RefreshTokenFindManyArgs,
  RefreshTokenGetPayload,
  RefreshTokenUpdateArgs,
} from '@/generated/prisma/models.js'
import { prisma } from '@db'
import type { TransactionClient } from '@/generated/prisma/internal/prismaNamespace.js'

let instance: RefreshTokenRepository | undefined

export class RefreshTokenRepository {
  static getInstance() {
    instance ??= new RefreshTokenRepository()

    return instance
  }

  async findMany(parameters?: RefreshTokenFindManyArgs) {
    const limit = parameters?.take ?? PAGINATION.LIMIT
    const skip = parameters?.skip ?? 0
    const page = skip === 0 ? 1 : skip / limit + 1

    parameters = { ...parameters, take: limit, skip }

    const [count, data] = await Promise.all([
      prisma.refreshToken.count({ where: parameters.where }),
      prisma.refreshToken.findMany(parameters),
    ])

    return {
      data,
      pagination: { page, pageSize: limit, total: count, pageCount: Math.ceil(count / limit) },
    }
  }

  findOne(parameters: RefreshTokenFindFirstArgs) {
    return prisma.refreshToken.findFirst(parameters)
  }

  create(data: RefreshTokenCreateArgs['data'], tx?: TransactionClient) {
    const _prisma = tx ?? prisma

    return _prisma.refreshToken.create({ data, select: { id: true } })
  }

  update(id: number, data: RefreshTokenUpdateArgs['data']) {
    return prisma.refreshToken.update({ where: { id }, data, select: { id: true } })
  }

  delete(id: number) {
    return prisma.refreshToken.delete({ where: { id }, select: { id: true } })
  }

  deleteByToken(token: string) {
    return prisma.refreshToken.delete({ where: { token }, select: { id: true } })
  }

  async getExpiresAt(token: string) {
    const entity = await prisma.refreshToken.findUniqueOrThrow({
      where: { token },
      select: { expiresAt: true },
    })

    return entity.expiresAt
  }

  async getTokenDataForValidation(token: string) {
    const select = { expiresAt: true, userId: true }

    type RefreshTokenData = RefreshTokenGetPayload<{ select: typeof select }>

    const entity = await prisma.refreshToken.findUnique({
      where: { token },
      select,
    })

    return entity as RefreshTokenData | null
  }
}
