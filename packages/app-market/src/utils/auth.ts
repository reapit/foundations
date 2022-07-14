import { LoginIdentity, ReapitConnectSession } from '@reapit/connect-session'

export const COGNITO_GROUP_DEVELOPER_EDITION = 'AgencyCloudDeveloperEdition'
export const COGNITO_GROUP_ADMIN_USERS = 'MarketplaceAdmin'
export const COGNITO_GROUP_ADMIN_USERS_LEGACY = 'ReapitUserAdmin'
export const COGNITO_GROUP_USERS = 'ReapitUser'
export const COGNITO_GROUP_ORGANISATION_ADMIN = 'OrganisationAdmin'

export const selectIsAdmin = (state: ReapitConnectSession | null): boolean => {
  return selectIsOffGroupingAdmin(state) || selectIsNonOffGroupingAdmin(state)
}

export const selectIsOffGroupingAdmin = (state: ReapitConnectSession | null): boolean => {
  const hasUserGroups = selectIsOffGrouping(state)
  if (hasUserGroups) {
    const isAdmin = selectIsMarketplaceAdmin(state) || selectIsOrgAdmin(state)
    return isAdmin && hasUserGroups
  }

  return false
}

export const selectIsOrgAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ORGANISATION_ADMIN))
}

export const selectIsMarketplaceAdmin = (state: ReapitConnectSession | null): boolean => {
  const loginIdentity = selectLoginIdentity(state)

  return Boolean(loginIdentity?.groups?.includes(COGNITO_GROUP_ADMIN_USERS))
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

export const selectLoginIdentity = (state: ReapitConnectSession | null): LoginIdentity | undefined => {
  return state?.loginIdentity
}
