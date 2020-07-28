import { ReduxState } from '@/types/core'

export const selectAppAuthenticationLoading = (state: ReduxState): boolean => {
  return state.apps.authentication?.isLoading
}
export const selectAppAuthenticationCode = (state: ReduxState): string => {
  return state.apps.authentication?.code
}
