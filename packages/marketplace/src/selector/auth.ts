import { ReduxState } from '@/types/core'

export const selectLoginType = (state: ReduxState) => {
  return state.auth.loginType
}

export const selectIsAdmin = (state: ReduxState) => {
  return state.auth?.loginSession?.loginIdentity?.isAdmin || false
}

export const selectLoginIdentity = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity
}

export const selectLoginSession = (state: ReduxState) => {
  return state.auth?.loginSession
}
