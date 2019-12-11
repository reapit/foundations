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

export function getLoginTypeByPath(path: string) {
  switch (path) {
    case Routes.ADMIN_LOGIN:
      return 'ADMIN'
      break
    case Routes.DEVELOPER_LOGIN:
      return 'DEVELOPER'
      break
    default:
      return 'CLIENT'
  }
}
