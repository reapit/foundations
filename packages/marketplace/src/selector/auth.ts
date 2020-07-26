import { ReapitConnectSession } from '@reapit/connect-session'

// FIXME(selectLoginType)
// remove

// REMOVE
// FIXME(selectLoginIdentity)
export const selectLoginIdentity = (state: ReapitConnectSession | null) => {
  return state?.loginIdentity
}

/**
 * FIXME(u se)
 * selectIsAdmin
 * replace with one later
 * fix test
 */

/**
 * TODO: selector
 */
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
