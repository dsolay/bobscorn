declare global {
  interface BigInt {
    toJSON(): string
  }
}

declare module 'eslint-plugin-promise'

declare module '@eslint-community/eslint-plugin-eslint-comments/configs'
