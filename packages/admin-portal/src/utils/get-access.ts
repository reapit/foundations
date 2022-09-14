import { ReapitConnectSession } from '@reapit/connect-session'
import Routes from '../constants/routes'

export interface UserAccess {
  fullAccess: boolean
  limitedAccess: boolean
}

const ADMIN_USER_GROUP = ['ReapitEmployeeFoundationsAdmin']
const ADMIN_LIMITED_ROUTES = [
  Routes.ROOT,
  Routes.BILLING,
  Routes.INSTALLATIONS,
  Routes.CUSTOMERS,
  Routes.APPS,
  Routes.DEV_MANAGEMENT,
  Routes.USAGE,
]

export const getAccess = (session: ReapitConnectSession | null, route: string): boolean => {
  const permissionGroups = session?.loginIdentity?.groups ?? []
  const userEmail = session?.loginIdentity.email ?? ''

  const accessPermissions = ADMIN_USER_GROUP.map((group) => permissionGroups.includes(group)).includes(true)
  const hasLimitedAccess = window.reapit.config.limitedUserAccessWhitelist.includes(userEmail)

  if (hasLimitedAccess && accessPermissions) {
    return ADMIN_LIMITED_ROUTES.includes(route)
  }

  return accessPermissions
}
