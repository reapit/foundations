import { ReduxState } from '@/types/core'

export const getInstallations = (state: ReduxState) => {
  return state.installations
}

export const selectInstallAppLoading = (state: ReduxState) => {
  return state.installations.loading
}
