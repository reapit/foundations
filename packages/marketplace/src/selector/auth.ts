import { ReduxState } from '@/types/core'

export const selectLoginType = (state: ReduxState) => {
  return state.auth.loginType
}
