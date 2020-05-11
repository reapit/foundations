import { ReduxState } from '@/types/core'

export const selectDeveloperDetailLoading = (state: ReduxState) => {
  return state.appDetail.loading
}
