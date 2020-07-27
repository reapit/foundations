import { ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'

export const selectLoginIdentity = (state: ReapitConnectSession | null): LoginIdentity | undefined => {
  return state?.loginIdentity
}

export const selectIsAdmin = (state: ReapitConnectSession | null): Boolean => {
  return Boolean(state?.loginIdentity.adminId)
}

export const selectClientId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.clientId || ''
}

export const selectDeveloperId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity.developerId || ''
}
