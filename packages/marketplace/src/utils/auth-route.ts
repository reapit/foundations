import Routes from '../constants/routes'

export function getDefaultRoute() {
  return `${window.location.origin}${Routes.INSTALLED_APPS}`
}
