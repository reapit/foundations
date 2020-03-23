import { LoginType } from '@reapit/cognito-auth'
import Routes from '../constants/routes'

export function getAuthRouteByLoginType(loginType: LoginType) {
  switch (loginType) {
    case 'ADMIN':
      return Routes.ADMIN_LOGIN
    case 'DEVELOPER':
      return Routes.DEVELOPER_LOGIN
    default:
      return Routes.CLIENT_LOGIN
  }
}

export function getDefaultRouteByLoginType({
  loginType,
  isDeveloperFirstTimeLoginComplete,
  isClientFirstTimeLoginComplete,
}: {
  loginType: LoginType
  isDeveloperFirstTimeLoginComplete?: boolean
  isClientFirstTimeLoginComplete?: boolean
}) {
  switch (loginType) {
    case 'ADMIN':
      return `${window.location.origin}${Routes.ADMIN_APPROVALS}`
    case 'DEVELOPER':
      return !isDeveloperFirstTimeLoginComplete
        ? `${window.location.origin}${Routes.DEVELOPER_WELCOME}`
        : `${window.location.origin}${Routes.DEVELOPER_MY_APPS}`
    default:
      return !isClientFirstTimeLoginComplete
        ? `${window.location.origin}${Routes.CLIENT_WELCOME}`
        : `${window.location.origin}${Routes.INSTALLED_APPS}`
  }
}

export function getLoginTypeByPath(path: string) {
  switch (path) {
    case Routes.ADMIN_LOGIN:
      return 'ADMIN'
    case Routes.DEVELOPER_LOGIN:
      return 'DEVELOPER'
    default:
      return 'CLIENT'
  }
}

export function getDefaultPathByLoginType({
  loginType,
  isDeveloperFirstTimeLoginComplete,
  isClientFirstTimeLoginComplete,
}: {
  loginType: LoginType
  isDeveloperFirstTimeLoginComplete?: boolean
  isClientFirstTimeLoginComplete?: boolean
}) {
  switch (loginType) {
    case 'ADMIN':
      return Routes.ADMIN_APPROVALS
    case 'DEVELOPER':
      return !isDeveloperFirstTimeLoginComplete ? Routes.DEVELOPER_WELCOME : Routes.DEVELOPER_MY_APPS
    default:
      return !isClientFirstTimeLoginComplete ? Routes.CLIENT_WELCOME : Routes.INSTALLED_APPS
  }
}
