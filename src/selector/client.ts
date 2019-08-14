import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectClientId = (state: ReduxState) => {
  return oc(state.auth.loginSession).loginIdentity.clientId('')
}

export const selectLoggedUserEmail = (state: ReduxState) => {
  return oc(state.auth.loginSession).loginIdentity.email()
}
