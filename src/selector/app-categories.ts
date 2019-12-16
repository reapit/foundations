import { ReduxState } from '@/types/core'

export const selectCategories = (state: ReduxState) => {
  return [...(state?.appCategories?.data || []), { id: 'DIRECT_API_APPS_FILTER', name: 'Direct API' }]
}
