import { ReduxState } from '@/types/core'
import { ReapitConnectSession } from '@reapit/connect-session'

export const selectLoginType = (state: ReduxState) => {
  return state.auth.loginType
}

export const selectLoginIdentity = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity
}

export const selectClientId = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity.clientId
}

/**
 * FIXME(u se)
 * selectIsAdmin
 * replace with one later
 * fix test
 */
export const selectIsAdminFromHook = (state: ReapitConnectSession | null) => {
  return Boolean(state?.loginIdentity.adminId) || false
}

export const selectIsAdmin = (state: ReduxState) => {
  return state.auth?.loginSession?.loginIdentity?.isAdmin || false
}

// a: create select developer id
export const selectClientIdFromHook = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity.clientId || ''
}

export const selectDeveloperIdFromHook = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity.developerId || ''
}

export const selectDeveloperId = (state: ReduxState): string => {
  return state.auth.loginSession?.loginIdentity.developerId || ''
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

export const selectIsDesktopMode = (state: ReduxState): boolean => {
  return state.auth.refreshSession?.mode === 'DESKTOP'
}
