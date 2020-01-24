import { ReduxState } from '@/types/core'

export const selectUserCode = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.userCode || ''
}
