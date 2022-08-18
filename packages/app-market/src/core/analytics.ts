import { isTruthy } from '@reapit/utils-common'
import { ReapitConnectSession } from '@reapit/connect-session'
import mixpanel from 'mixpanel-browser'
import { Dispatch, SetStateAction } from 'react'
import { TrackingEvent } from './analytics-events'

export interface TrackingEventData {
  [key: string]: any
}

export const trackEvent = (event: TrackingEvent, shouldTrack: boolean, data?: TrackingEventData) => {
  if (!shouldTrack) return

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

export const registerUserHandler =
  (
    connectSession: ReapitConnectSession | null,
    analyticsRegistered: boolean,
    setAnalyticsRegistered: Dispatch<SetStateAction<boolean>>,
  ) =>
  () => {
    if (connectSession && !analyticsRegistered) {
      const { email, name, clientId, userCode, orgName, groups, developerId } = connectSession?.loginIdentity ?? {}
      const userRoles = getRoleFromGroups(groups)

      mixpanel.identify(email)

      mixpanel.people.set({
        Name: name,
        Email: email,
        'User Neg Code': userCode,
        'Organisation Name': orgName,
        'Organisation Client Code': clientId,
        'Developer Id': developerId,
        'User Roles': userRoles,
      })

      setAnalyticsRegistered(true)
    }
  }
