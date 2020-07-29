import { ReduxState } from '@/types/core'

export const selectInstallationFormState = (state: ReduxState) => {
  return state.installations.formState
}
