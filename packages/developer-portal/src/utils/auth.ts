import { ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'

export const COGNITO_GROUP_ADMIN_USERS_LEGACY = 'ReapitUserAdmin'
export const COGNITO_GROUP_ADMIN_USERS = 'MarketplaceAdmin'
export const COGNITO_GROUP_USERS = 'ReapitUser'
export const COGNITO_GROUP_DEVELOPER_ADMIN = 'FoundationsDeveloperAdmin'

export const selectIsAdmin = (connectSession: ReapitConnectSession | null) => {
  return Boolean(connectSession?.loginIdentity?.adminId)
}

export const selectLoginIdentity = (connectSession: ReapitConnectSession | null): LoginIdentity | null => {
  return connectSession?.loginIdentity ?? null
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

export const selectIsUserOrUserAdmin = (state: ReapitConnectSession | null): boolean => {
  return selectIsUserAdmin(state) || selectIsCustomer(state)
}

export const selectIsDeveloperAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)
  if (!loginIdentity) return false
  return loginIdentity.groups.includes(COGNITO_GROUP_DEVELOPER_ADMIN)
}

export const selectIsUserAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)
  if (!loginIdentity) return false
  return Boolean(
    (loginIdentity.groups.includes(COGNITO_GROUP_ADMIN_USERS) ||
      loginIdentity.groups.includes(COGNITO_GROUP_ADMIN_USERS_LEGACY)) &&
      loginIdentity.agencyCloudId &&
      loginIdentity.agencyCloudId !== 'SBOX',
  )
}

export const selectIsCustomer = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)
  if (!loginIdentity) return false
  return Boolean(
    loginIdentity.agencyCloudId &&
      loginIdentity.agencyCloudId !== 'SBOX' &&
      loginIdentity.groups?.includes(COGNITO_GROUP_USERS),
  )
}
