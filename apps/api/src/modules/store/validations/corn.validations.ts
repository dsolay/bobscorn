import { z } from 'zod'

export const BuyCornDtoSchema = z
  .object({
    data: z
      .object({
        quantity: z.number().min(1).default(1),
        total: z.number().min(1),
        date: z.coerce.date(),
      })
      .strict(),
  })
  .strict()

export type BuyCornDto = z.infer<typeof BuyCornDtoSchema>
