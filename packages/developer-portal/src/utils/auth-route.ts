import Routes from '../constants/routes'

export function getDefaultRoute(isFirtTimeLogin: boolean) {
  if (window.location.pathname === Routes.DEVELOPER_EDITION_DOWNLOAD) {
    return `${window.location.origin}${Routes.DEVELOPER_EDITION_DOWNLOAD}`
  }
  return !isFirtTimeLogin
    ? `${window.location.origin}${Routes.DEVELOPER_WELCOME}`
    : `${window.location.origin}${Routes.DEVELOPER_MY_APPS}`
}

export function getDefaultPath(isDesktopMode: boolean, isFirtTimeLogin: boolean) {
  if (isDesktopMode) {
    return Routes.DEVELOPER_MY_APPS
  }
  return !isFirtTimeLogin ? Routes.DEVELOPER_WELCOME : Routes.DEVELOPER_MY_APPS
}
