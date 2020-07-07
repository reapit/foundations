import { ReduxState } from '@/types/core'

export const selectCategories = (state: ReduxState) => {
  return state?.appCategories?.data || []
}
