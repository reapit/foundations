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

export const selectIsAdmin = (state: ReduxState) => {
  return state.auth?.loginSession?.loginIdentity?.isAdmin || false
}

export const selectDeveloperId = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity.developerId
}

export const selectLoginSession = (state: ReduxState) => {
  return state.auth?.loginSession
}

export const selectRefreshSession = (state: ReduxState) => {
  return state.auth?.refreshSession
}

export const selectIsTermAccepted = (state: ReduxState): boolean => {
  return state.auth.isTermAccepted
}
