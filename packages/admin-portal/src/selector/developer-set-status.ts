import { ReduxState, FormState } from '@/types/core'

export const selectDeveloperSetStatusFormState = (state: ReduxState): FormState => {
  return state.developers?.setStatusFormState
}
