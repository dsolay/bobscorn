import type { User } from '~~/types'

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()
  const { me } = useUserApi()

  let user: User | null = null

  try {
    const response = await me()

    user = response.data
  }
  catch {
    user = null
  }

  return nuxtApp.runWithContext(() => {
    const store = useAuthStore(nuxtApp.$pinia)
    store.setUser(user)
  })
})
