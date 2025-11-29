import type { CornHistory, CornHistoryDto, FindParams, PaginatedApiResponse } from '~~/types'

export function useCornApi() {
  const { $request } = useNuxtApp()

  const buyCorn = async (data: CornHistoryDto) => {
    await $request('/corns/buy', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  const getCornHistory = (parameters: FindParams = {}) => {
    return $request<PaginatedApiResponse<CornHistory>>('/corns/history', {
      method: 'POST',
      body: JSON.stringify(parameters),
    })
  }

  return { buyCorn, getCornHistory }
}
