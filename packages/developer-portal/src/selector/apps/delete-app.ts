import { ReduxState } from '@/types/core'

export const selectDeleteAppLoading = (state: ReduxState): boolean => {
  return state.apps?.deleteApp.isLoading
}
