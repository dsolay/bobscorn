import { APP_ERROR } from '~/constants'

export default defineNuxtPlugin((nuxtApp) => {
  const request = $fetch.create({
    baseURL: nuxtApp.$config.public.apiBase,
    credentials: 'include',
    async onResponseError({ request, response, options }) {
      const status = response.status
      const errorCode = response._data?.error?.code

      const shouldRefreshToken
        = status === 401
          && errorCode === APP_ERROR.EXPIRED_TOKEN
          && !options.retry

      if (shouldRefreshToken) {
        options.retry = 1

        const baseUrl = nuxtApp.$config.public.apiBase
        await $fetch(`${baseUrl}/oauth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
        })

        await $fetch(request, {
          ...options as any,
          retry: undefined,
          onResponseError: undefined,
        })
      }
    },
  })

  return {
    provide: { request },
  }
})
