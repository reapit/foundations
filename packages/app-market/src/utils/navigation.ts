import { History } from 'history'
import { trackEvent, TrackingEvent } from '../core/analytics'

export const openNewPage = (uri: string) => () => {
  trackEvent(TrackingEvent.OpenExternalPage, true, { url: uri })

  window.open(uri, '_blank')
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

  window.location.href = uri
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
