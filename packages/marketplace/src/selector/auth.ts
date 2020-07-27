import { ReapitConnectSession } from '@reapit/connect-session'

export const selectLoginIdentity = (state: ReapitConnectSession | null) => {
  return state?.loginIdentity
}

export const selectIsAdmin = (state: ReapitConnectSession | null) => {
  return Boolean(state?.loginIdentity.adminId) || false
}

// a: create select developer id
export const selectClientId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.clientId || ''
}

export const selectDeveloperId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity.developerId || ''
}
