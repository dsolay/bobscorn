import type { ApiResponse, Credentials, LoginData } from '~~/types'

export function useAuthApi() {
  const { $request } = useNuxtApp()

  const store = useAuthStore()

  const login = async (credentials: Credentials) => {
    const response = await $request<ApiResponse<LoginData>>('/oauth/token', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    store.setUser(response.data.user)
  }

  const logout = async () => {
    await $request('/oauth/logout', { method: 'POST' })

    store.setUser(null)
  }

  return { login, logout }
}
