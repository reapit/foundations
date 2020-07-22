import Routes from '../constants/routes'

export function getAuthRoute() {
  return Routes.LOGIN
}

export function getDefaultRoute() {
  return `${window.location.origin}${Routes.INSTALLED_APPS}`
}

export function getDefaultPath() {
  return Routes.INSTALLED_APPS
}
