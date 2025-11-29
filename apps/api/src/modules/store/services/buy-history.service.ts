import type { BuyHistoryCreateArgs, BuyHistoryFindManyArgs } from '@/generated/prisma/models.js'
import { BuyHistoryRepository } from '@/modules/store/index.js'
import type { TransactionClient } from '@/generated/prisma/internal/prismaNamespace.js'

let instance: BuyHistoryService | undefined

export class BuyHistoryService {
  readonly #repository: BuyHistoryRepository

  constructor() {
    this.#repository = BuyHistoryRepository.getInstance()
  }

  static getInstance() {
    instance ??= new BuyHistoryService()

    return instance
  }

  find(parameters?: BuyHistoryFindManyArgs) {
    return this.#repository.findMany(parameters)
  }

  save(data: BuyHistoryCreateArgs['data'], tx?: TransactionClient) {
    return this.#repository.create(data, tx)
  }
}
