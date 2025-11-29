import type { User } from '~~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const setUser = (value: User | null) => {
    user.value = value
  }

  return { user, setUser }
})
