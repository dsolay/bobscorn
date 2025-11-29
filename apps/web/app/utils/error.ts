import { FetchError } from 'ofetch'

export function onUnhandledFetchError(callback: (error: FetchError) => void) {
  // On server, we do not want any custom handlers
  if (import.meta.server) {
    return
  }

  // Unhandled Rejection is thrown in dev mode
  globalThis.addEventListener('unhandledrejection', (event) => {
    if (event.reason instanceof FetchError) {
      callback(event.reason)
    }
  })

  const nuxtApp = useNuxtApp()
  const originalErrorHandler = nuxtApp.vueApp.config.errorHandler
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    if (error instanceof FetchError) {
      callback(error)
      return
    }

    if (originalErrorHandler) {
      originalErrorHandler(error, instance, info)
    }
  }
}
