import { ReduxState } from '@/types/core'

export const getInstallations = (state: ReduxState) => {
  return state.installations
}
