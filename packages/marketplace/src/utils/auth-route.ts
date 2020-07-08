import Routes from '../constants/routes'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'

export function getAuthRoute() {
  return Routes.LOGIN
}

export function getDefaultRoute({ isFirstTimeLoginComplete }) {
  return !isFirstTimeLoginComplete && !getMarketplaceGlobalsByKey()
    ? `${window.location.origin}${Routes.CLIENT_WELCOME}`
    : `${window.location.origin}${Routes.INSTALLED_APPS}`
}

export function getDefaultPath({
  isDesktopMode,
  isFirstTimeLoginComplete,
}: {
  isDesktopMode?: boolean
  isFirstTimeLoginComplete?: boolean
}) {
  if (isDesktopMode) {
    return Routes.INSTALLED_APPS
  }
  return !isFirstTimeLoginComplete ? Routes.CLIENT_WELCOME : Routes.INSTALLED_APPS
}
