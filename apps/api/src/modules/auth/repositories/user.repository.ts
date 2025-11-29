import { PAGINATION } from '@/constants/index.js'
import type {
  UserCreateArgs,
  UserFindFirstArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
  UserUpdateArgs,
} from '@/generated/prisma/models.js'
import { prisma } from '@db'

let instance: UserRepository | undefined

export class UserRepository {
  static getInstance() {
    instance ??= new UserRepository()

    return instance
  }

  async findMany(parameters?: UserFindManyArgs) {
    const limit = parameters?.take ?? PAGINATION.LIMIT
    const skip = parameters?.skip ?? 0
    const page = skip === 0 ? 1 : skip / limit + 1

    parameters = { ...parameters, take: limit, skip }

    const [count, data] = await Promise.all([
      prisma.user.count({ where: parameters.where }),
      prisma.user.findMany({
        ...parameters,
        omit: {
          ...parameters.omit,
          password: true,
        },
      }),
    ])

    return {
      data,
      pagination: { page, pageSize: limit, total: count, pageCount: Math.ceil(count / limit) },
    }
  }

  findOne(parameters: UserFindFirstArgs) {
    return prisma.user.findFirst(parameters)
  }

  findById(id: number, parameters: Omit<UserFindUniqueArgs, 'where'>) {
    return prisma.user.findUniqueOrThrow({ where: { id }, ...parameters })
  }

  findByEmail(email: string, parameters?: Omit<UserFindUniqueArgs, 'where'>) {
    return prisma.user.findUnique({ where: { email }, ...parameters })
  }

  create(data: UserCreateArgs['data']) {
    return prisma.user.create({ data, select: { id: true } })
  }

  update(id: number, data: UserUpdateArgs['data']) {
    return prisma.user.update({ where: { id }, data, select: { id: true } })
  }

  delete(id: number) {
    return prisma.user.delete({ where: { id }, select: { id: true } })
  }
}
