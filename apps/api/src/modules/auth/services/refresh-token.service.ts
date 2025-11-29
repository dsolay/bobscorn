import dayjs from 'dayjs'
import type {
  RefreshTokenCreateArgs,
  RefreshTokenFindManyArgs,
} from '@/generated/prisma/models.js'
import { RefreshTokenRepository } from '@/modules/auth/index.js'
import { ExpiredRefreshTokenError, InvalidRefreshTokenError } from '@/errors/index.js'
import type { TransactionClient } from '@/generated/prisma/internal/prismaNamespace.js'

let instance: RefreshTokenService | undefined

export class RefreshTokenService {
  readonly #repository: RefreshTokenRepository

  constructor() {
    this.#repository = RefreshTokenRepository.getInstance()
  }

  static getInstance() {
    instance ??= new RefreshTokenService()

    return instance
  }

  find(parameters?: RefreshTokenFindManyArgs) {
    return this.#repository.findMany(parameters)
  }

  async validateRefresToken(token: string) {
    const entity = await this.#repository.getTokenDataForValidation(token)

    if (entity === null) throw new InvalidRefreshTokenError()

    const now = dayjs()
    if (now.isAfter(dayjs(entity.expiresAt))) throw new ExpiredRefreshTokenError()

    return entity.userId
  }

  getExpiresAt(token: string) {
    return this.#repository.getExpiresAt(token)
  }

  save(data: RefreshTokenCreateArgs['data'], tx?: TransactionClient) {
    return this.#repository.create(data, tx)
  }

  delete(token: string) {
    return this.#repository.deleteByToken(token)
  }

  deleteForCurrentSession(token: string) {
    return this.#repository.deleteByToken(token)
  }
}
