import { isTruthy } from '@reapit/utils-common'
import { ReapitConnectSession } from '@reapit/connect-session'
import mixpanel from 'mixpanel-browser'
import { Dispatch, SetStateAction } from 'react'

export enum TrackingEvent {
  LoadLogin = 'Load Web Login Page',
  LoadBrowse = 'Load Browse Apps Page',
  LoadAppDetail = 'Load App Details Page',
  LoadInstalled = 'Load Installed Apps Page',
  LoadProfile = 'Load Profile Page',
  LoadSettingsInstalled = 'Load Settings Installed Apps Page',
  LoadSupportPage = 'Load Support Page',
  NavigateInternalPage = 'Navigate To Internal Page',
  NavigateBack = 'Navigate To Previous Page',
  NavigateExternalPage = 'Navigate To External Page',
  OpenExternalPage = 'Open External Page',
  LaunchAppAc = 'Launch App In AgencyCloud',
  LaunchAppWeb = 'Launch App In External Browser',
  ClickFiltersTile = 'Click Filters Tile, Apply Filters',
  ClickClearFilters = 'Click Clear Filters Button',
  SearchApps = 'Search Term Change',
  FilterApps = 'Filter Category Changed',
  ClickMobileControls = 'Click Mobile Controls',
  ClickSeeAllFilter = 'Click See All Filter',
  ClickCloseWithoutInstalling = 'Click Close Without Installing',
  ClickConfirnInstallation = 'Click Confirn Installation',
  InstallationSuccess = 'Installation Success',
  InstallationFailed = 'Installation Failed',
  ClickInstallAppButton = 'Click Install App Button',
  ClickViewVideo = 'Click View Video',
  ClickScrollImageCarousel = 'Click Scroll Image Carousel',
  ClickLoginWebButton = 'Click Login Web Button',
  ClickLogoutButton = 'Click Logout Button',
  ClickCloseWithoutUninstalling = 'Click Close Without Uninstalling',
  ClickUninstallApp = 'Click Uninstall App',
}

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

const getRoleFromGroups = (groups: string[]) => {
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

export const onPageLoadHandler = (event: TrackingEvent, shouldTrack: boolean, data?: TrackingEventData) => () => {
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
