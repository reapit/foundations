import mixpanel from 'mixpanel-browser'
import { TrackingEvent } from './analytics-events'
import { isTruthy } from '@reapit/utils-common'

export interface TrackingEventData {
  [key: string]: any
}

export const trackEvent = (event: TrackingEvent, shouldTrack: boolean, data?: TrackingEventData) => {
  const isLocal = process.env.appEnv !== 'production'
  const hasTrackingConsent = mixpanel.has_opted_in_tracking()

  if (!shouldTrack || isLocal || !hasTrackingConsent) return

  if (data) {
    mixpanel.track(event, data)
  } else {
    mixpanel.track(event)
  }
}

export const getRoleFromGroups = (groups: string[]) => {
  const isOrgAdmin = groups.includes('OrganisationAdmin') && 'Group Organisation Admin'
  const isDeveloper = groups.includes('FoundationsDeveloper') && 'Developer'
  const isDeveloperAdmin = groups.includes('FoundationsDeveloperAdmin') && 'Developer Admin'
  const isAcUser = groups.includes('ReapitUser') && 'AgencyCloud User'
  const isMaketplaceAdmin = groups.includes('MarketplaceAdmin') && 'AgencyCloud Marketplace Admin'
  const isReapitEmployee = groups.includes('ReapitEmployee') && 'Reapit Employee'
  const isReapitEmployeeAdmin = groups.includes('ReapitEmployeeFoundationsAdmin') && 'Reapit Employee Admin'

  return [
    isOrgAdmin,
    isMaketplaceAdmin,
    isAcUser,
    isDeveloperAdmin,
    isDeveloper,
    isReapitEmployee,
    isReapitEmployeeAdmin,
  ]
    .filter(isTruthy)
    .join(', ')
}

export const trackEventHandler = (event: TrackingEvent, shouldTrack: boolean, data?: TrackingEventData) => () => {
  trackEvent(event, shouldTrack, data)
}
