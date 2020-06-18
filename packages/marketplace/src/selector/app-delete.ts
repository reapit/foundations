import { ReduxState } from '@/types/core'

export const selectAppDeleteFormState = (state: ReduxState) => {
  return state.appDelete.formState
}
