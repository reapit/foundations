import { ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'

export const selectIsAdmin = (connectSession: ReapitConnectSession | null) => {
  return Boolean(connectSession?.loginIdentity?.adminId)
}

export const selectLoginIdentity = (connectSession: ReapitConnectSession | null) => {
  return (connectSession && connectSession?.loginIdentity) || ({} as LoginIdentity)
}

export const selectClientId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.clientId || ''
}

export const selectDeveloperId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.developerId || ''
}

export const selectLoggedUserEmail = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.email || ''
}
