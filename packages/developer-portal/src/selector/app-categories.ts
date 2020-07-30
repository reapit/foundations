import { ReduxState } from '@/types/core'

export const selectCategories = (state: ReduxState) => {
  return state?.categories?.list?.data || []
}
