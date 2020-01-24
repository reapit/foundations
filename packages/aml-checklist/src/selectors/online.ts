import { ReduxState } from '@/types/core'

export const selectOnlineStatus = (state: ReduxState) => {
  return state ? true : false
}
