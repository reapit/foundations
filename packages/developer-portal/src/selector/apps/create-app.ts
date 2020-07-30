import { ReduxState } from '@/types/core'

export const selectCreateAppLoading = (state: ReduxState): boolean => {
  return state.apps?.createApp.isLoading
}
