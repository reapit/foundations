import { ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'
import {
  COGNITO_GROUP_DEVELOPER_EDITION,
  COGNITO_GROUP_ADMIN_USERS,
  COGNITO_GROUP_USERS,
  COGNITO_GROUP_ORGANISATION_ADMIN,
} from '@/constants/api'

export const selectLoginIdentity = (state: ReapitConnectSession | null): LoginIdentity | undefined => {
  return state?.loginIdentity
}

export const selectIsAdmin = (state: ReapitConnectSession | null): boolean => {
  return selectIsOrgAdmin(state) || selectIsFoundationsAdmin(state)
}

export const selectIsOrgAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ORGANISATION_ADMIN))
}

export const selectIsFoundationsAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ADMIN_USERS))
}

export const selectIsOffGrouping = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.offGrouping)
}

export const selectIsUser = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_USERS))
}

export const selectClientId = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.clientId || 'SBOX'
}

export const selectDeveloperId = (state: ReapitConnectSession | null): string | null => {
  return state?.loginIdentity.developerId || null
}

export const selectSandboxDeveloper = (state: ReapitConnectSession | null): string | null => {
  const developerId = selectDeveloperId(state)
  return selectClientId(state) === 'SBOX' && developerId ? developerId : null
}

export const selectLoggedUserEmail = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.email || ''
}

export const selectLoggedUserName = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.name || ''
}

export const selectLoggedUserCompanyName = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.orgName || ''
}

export const selectDeveloperEditionId = (state: ReapitConnectSession | null): string | null => {
  const loginIdentity = selectLoginIdentity(state)
  if (loginIdentity?.groups.includes(COGNITO_GROUP_DEVELOPER_EDITION)) {
    return state?.loginIdentity?.developerId || ''
  }
  return null
}
