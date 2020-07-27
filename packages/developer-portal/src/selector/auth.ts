import { ReapitConnectSession, LoginIdentity } from '../../../connect-session/src/types'

// export const selectLoginType = (state: ReduxState) => {
//   return state.auth.loginType
// }

// export const selectLoginIdentity = (state: ReduxState) => {
//   return state.auth.loginSession?.loginIdentity
// }

// export const selectClientId = (state: ReduxState) => {
//   return state.auth.loginSession?.loginIdentity.clientId
// }

export const selectIsAdmin = (connectSession: ReapitConnectSession | null) => {
  return Boolean(connectSession?.loginIdentity?.adminId)
}

// export const selectDeveloperId = (state: ReduxState): string => {
//   return state.auth.loginSession?.loginIdentity.developerId || ''
// }

// export const selectLoginSession = (state: ReduxState) => {
//   return state.auth?.loginSession
// }

// export const selectIsTermAccepted = (state: ReduxState): boolean => {
//   return state.auth.isTermAccepted
// }

export const selectLoginIdentity = (connectSession: ReapitConnectSession | null) => {
  return (connectSession && connectSession?.loginIdentity) || ({} as LoginIdentity)
}
