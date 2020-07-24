import { ReduxState } from '@/types/core'

export const selectAppAuthenticationLoading = (state: ReduxState): boolean => {
  return state.appAuthentication?.isLoading
}
export const selectAppAuthenticationCode = (state: ReduxState): string => {
  return state.appAuthentication?.code
}
