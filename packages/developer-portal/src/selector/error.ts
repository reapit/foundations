import { ReduxState } from '@/types/core'
import { ErrorState } from '@/reducers/error'

export const selectErrorState = (state: ReduxState): ErrorState => {
  return state.error
}
