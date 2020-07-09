import { ReduxState, FormState } from '@/types/core'

export const selectAppDeleteFormState = (state: ReduxState): FormState => {
  return state.appDelete?.formState
}
