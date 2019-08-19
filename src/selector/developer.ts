import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectDeveloperId = (state: ReduxState) => {
  return oc(state.auth.loginSession).loginIdentity.developerId()
}
