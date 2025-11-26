export * from './logger.js'
export * from './error.js'
export * from './database.js'
export * from './routes.js'
export * from './api.js'
export * from './auth.js'

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type Unpacked<T> = T extends (infer U)[] ? U : T

export type AnyObject<Key extends string | number | symbol = string, Value = unknown> = Record<
  Key,
  Value
>

export type StringObject = AnyObject<string, string>

export type ID = number | string

export type KeyMapper<T> = (value: T, key: string, object: Record<string, T>) => string

export type DeployStage = 'local' | 'development' | 'uat' | 'production'

export type WithRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
}
