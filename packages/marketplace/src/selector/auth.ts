import { ReduxState } from '@/types/core'

export const selectLoginType = (state: ReduxState) => {
  return state.auth.loginType
}

export const selectLoginIdentity = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity
}

export const selectClientId = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity.clientId
}

export const selectDeveloperId = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity.developerId
}
