import Routes from '../constants/routes'

export function getDefaultRoute(isFirtTimeLogin: boolean) {
  if (window.location.pathname === Routes.DEVELOPER_EDITION_DOWNLOAD) {
    return `${window.location.origin}${Routes.DEVELOPER_EDITION_DOWNLOAD}`
  }
  return !isFirtTimeLogin ? `${window.location.origin}${Routes.WELCOME}` : `${window.location.origin}${Routes.APPS}`
}

export function getDefaultPath(isDesktopMode: boolean, isFirtTimeLogin: boolean) {
  if (isDesktopMode) {
    return Routes.APPS
  }
  return !isFirtTimeLogin ? Routes.WELCOME : Routes.APPS
}
