import { z } from 'zod'

export const AuthSchema = z.object({
  email: z.email(),
  password: z.string(),
}).strict()

export type AuthData = z.infer<typeof AuthSchema>
