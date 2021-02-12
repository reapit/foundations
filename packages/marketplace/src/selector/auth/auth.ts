import { ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'
import {
  COGNITO_GROUP_DEVELOPER_EDITION,
  COGNITO_GROUP_ADMIN_USERS,
  COGNITO_GROUP_USERS,
  COGNITO_GROUP_ORGANISATION_ADMIN,
  COGNITO_GROUP_ADMIN_USERS_LEGACY,
} from '@/constants/api'

export const selectLoginIdentity = (state: ReapitConnectSession | null): LoginIdentity | undefined => {
  return state?.loginIdentity
}

export const selectIsAdmin = (state: ReapitConnectSession | null): boolean => {
  return selectIsOffGroupingAdmin(state) || selectIsNonOffGroupingAdmin(state)
}

export const selectIsOrgAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ORGANISATION_ADMIN))
}

export const selectIsMarketplaceAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ADMIN_USERS))
}

export const selectIsOffGroupingAdmin = (state: ReapitConnectSession | null): boolean => {
  const hasUserGroups = selectIsOffGrouping(state)
  if (hasUserGroups) {
    const isAdmin = selectIsMarketplaceAdmin(state) || selectIsOrgAdmin(state)
    return isAdmin && hasUserGroups
  }

  return false
}

export const selectIsNonOffGroupingAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)
  const hasUserGroups = selectIsOffGrouping(state)

  if (!hasUserGroups) {
    return (
      Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ADMIN_USERS)) ||
      Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ADMIN_USERS_LEGACY))
    )
  }

  return false
}

export const selectIsOffGrouping = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.offGrouping)
}

export const selectOffGroupName = (state: ReapitConnectSession | null): string => {
  const loginIdentity = selectLoginIdentity(state)

  return loginIdentity?.offGroupName || ''
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
