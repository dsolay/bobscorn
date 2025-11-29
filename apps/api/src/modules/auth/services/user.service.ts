import { hash, compare } from 'bcrypt'
import { UserRepository, type RegisterData } from '@/modules/auth/index.js'
import { AUTH } from '@/constants/index.js'
import { BadCredentialsError } from '@/errors/index.js'
import { prisma } from '@db'
import type {
  UserCreateArgs,
  UserFindManyArgs,
  UserUpdateArgs,
} from '@/generated/prisma/models.js'
import { Prisma } from '@/generated/prisma/client.js'

let instance: UserService | undefined

export class UserService {
  readonly #repository: UserRepository

  constructor() {
    this.#repository = UserRepository.getInstance()
  }

  static getInstance() {
    instance ??= new UserService()

    return instance
  }

  find(parameters?: UserFindManyArgs) {
    return this.#repository.findMany(parameters)
  }

  async me(id: number) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
      },
    })

    return {
      ...user,
    }
  }

  async register({ password, confirmPassword, ...data }: RegisterData) {
    const hasedPassword = await hash(password, AUTH.SALT_ROUNDS)

    const parameters: UserCreateArgs['data'] = {
      ...data,
      fullname: `${data.name} ${data.lastname}`,
      password: hasedPassword,
    }

    return this.#repository.create(parameters)
  }

  async checkCredentials(credentials: { email: string, password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email, enabled: true, blocked: false },
      select: { id: true, password: true },
    })

    if (user === null) throw new BadCredentialsError()

    const match = await compare(credentials.password, user.password)

    if (!match) throw new BadCredentialsError()

    return user
  }

  async getUserDataToIssueToken(userId: number) {
    const userSelect = {
      id: true,
      name: true,
      lastname: true,
      email: true,
    }

    type UserPublicData = Prisma.UserGetPayload<{ select: typeof userSelect }>

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: userSelect,
    })

    return user as UserPublicData
  }

  async update(id: number, data: UserUpdateArgs['data']) {
    let _data: UserUpdateArgs['data'] = { ...data }

    if (data.name || data.lastname) {
      const user = await this.#repository.findById(id, { select: { name: true, lastname: true } })

      const _name = (data.name ?? user.name) as string
      const _lastname = (data.lastname ?? user.lastname) as string

      _data = { ..._data, fullname: `${_name} ${_lastname}` }
    }

    if (data.password && typeof data.password === 'string') {
      const hasedPassword = await hash(data.password, AUTH.SALT_ROUNDS)

      _data = { ..._data, password: hasedPassword }
    }

    return this.#repository.update(id, _data)
  }

  updateByEmail(email: string, data: UserUpdateArgs['data']) {
    return prisma.user.update({ where: { email }, data, select: { id: true } })
  }

  delete(id: number) {
    return this.#repository.delete(id)
  }
}
