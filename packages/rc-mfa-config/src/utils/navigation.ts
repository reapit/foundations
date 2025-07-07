import { NavigateFunction } from 'react-router'

export const DESKTOP_CONTEXT_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'

export const openNewPage = (uri: string) => () => {
  const isDesktop = Boolean(window[DESKTOP_CONTEXT_KEY])
  if (isDesktop) {
    window.location.href = `agencycloud://process/webpage?url=${uri}`
  } else {
    window.open(uri, '_blank', 'noopener, noreferrer')
  }
}

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  navigate(route)
}
