import { UserUncheckedUpdateInputSchema, UserUpdateInputSchema } from '@/generated/zod/index.js'
import { z } from 'zod'

export const PasswordSchema = z
  .string()
  .min(8)
  .refine(password => /[A-Z]/.test(password))
  .refine(password => /[a-z]/.test(password))
  .refine(password => /\d/.test(password))
  .refine(password => /[!@#$%^&*]/.test(password))

export const RegisterSchema = z
  .object({
    data: z.object({
      name: z.string(),
      lastname: z.string(),
      email: z.email(),
      password: PasswordSchema,
      confirmPassword: z.string(),
    }),
  })
  .refine(({ data }) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
  })

export type RegisterData = z.infer<typeof RegisterSchema>['data']

export const UserUpdateDataSchema = z.union([
  UserUpdateInputSchema,
  UserUncheckedUpdateInputSchema,
])

export const UserUpdateSchema = z
  .object({
    data: UserUpdateDataSchema,
  })
  .strict()
