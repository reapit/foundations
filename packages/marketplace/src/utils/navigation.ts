import { History } from 'history'
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

export const navigate = (history: History, route: string) => (): void => {
  trackEvent(TrackingEvent.NavigateInternalPage, true, { route })

  history.push(route)
}

export const navigateBack = (history: History) => (): void => {
  trackEvent(TrackingEvent.NavigateBack, true)

  history.goBack()
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

export const handleLaunchApp = (connectIsDesktop: boolean, id?: string, launchUri?: string) => () => {
  if (!launchUri || !id) {
    return
  }

  if (connectIsDesktop) {
    trackEvent(TrackingEvent.LaunchAppAc, true, { url: launchUri, appId: id })

    window.location.href = `agencycloud://app?id=${id}&launchUri=${launchUri}`
    return
  }

  trackEvent(TrackingEvent.LaunchAppWeb, true, { url: launchUri, appId: id })

  window.location.href = launchUri
}
