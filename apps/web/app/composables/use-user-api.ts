import type { ApiResponse, User } from '~~/types'

export function useUserApi() {
  const { $request } = useNuxtApp()

  const me = () => {
    return $request<ApiResponse<User>>('/users/me', {
      method: 'GET',
    })
  }

  return { me }
}
