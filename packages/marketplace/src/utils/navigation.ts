import { NavigateFunction } from 'react-router'
import { trackEvent } from '../core/analytics'
import { TrackingEvent } from '../core/analytics-events'
export const DESKTOP_CONTEXT_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'

export const openNewPage = (uri: string) => () => {
  trackEvent(TrackingEvent.OpenExternalPage, true, { url: uri })
  const isDesktop = Boolean(window[DESKTOP_CONTEXT_KEY])
  if (isDesktop) {
    window.location.href = `agencycloud://process/webpage?url=${uri}`
  } else {
    window.open(uri, '_blank', 'noopener, noreferrer')
  }
}

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  trackEvent(TrackingEvent.NavigateInternalPage, true, { route })

  navigate(route)
}

export const navigateBack = (navigate: NavigateFunction) => (): void => {
  trackEvent(TrackingEvent.NavigateBack, true)

  navigate(-1)
}

export const navigateExternal = (uri: string) => (): void => {
  trackEvent(TrackingEvent.NavigateExternalPage, true, { url: uri })
  const isDesktop = Boolean(window[DESKTOP_CONTEXT_KEY])

  if (isDesktop) {
    window.location.href = `agencycloud://process/webpage?url=${uri}`
  } else {
    window.location.href = uri
  }
}

export const handleLaunchApp = (connectIsDesktop: boolean, id?: string, launchUri?: string, appName?: string) => () => {
  if (!launchUri || !id) {
    return
  }

  if (connectIsDesktop) {
    trackEvent(TrackingEvent.LaunchAppAc, true, { url: launchUri, appId: id, appName })

    window.location.href = `agencycloud://app?id=${id}&launchUri=${launchUri}`
    return
  }

  trackEvent(TrackingEvent.LaunchAppWeb, true, { url: launchUri, appId: id, appName })

  window.location.href = launchUri
}
