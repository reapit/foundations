import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectUserCode = (state: ReduxState) => {
  return oc(state).auth.loginSession.loginIdentity.userCode('')
}
