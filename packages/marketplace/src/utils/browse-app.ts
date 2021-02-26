import { ReapitConnectSession } from '@reapit/connect-session'
import { AppSummaryModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { COGNITO_GROUP_ORGANISATION_ADMIN } from '../constants/api'

export const HEADER_HEIGHT = 68
export const FEATURED_APP_HEIGHT = 200
export const NORMAL_APP_MIN_HEIGHT = 180
export const MAXIMUM_ITEMS_PER_ROW = 3

export const getNumberOfItems = () => {
  const normalAppContainerHeight = window.innerHeight - HEADER_HEIGHT - FEATURED_APP_HEIGHT
  const numOfRow = Math.ceil(normalAppContainerHeight / NORMAL_APP_MIN_HEIGHT)
  return numOfRow * MAXIMUM_ITEMS_PER_ROW
}

export const mergeAppsWithoutDuplicateId = (
  developerApps: AppSummaryModel[],
  oldApps: AppSummaryModel[] | undefined = [],
  newApps: AppSummaryModel[] | undefined = [],
): AppSummaryModel[] => {
  const newAppIds = newApps.map((app) => app.id)
  const developerAppIds = developerApps.map((app) => app.id)
  const filteredOldApps = oldApps.filter((app) => !newAppIds.includes(app.id) && !developerAppIds.includes(app.id))
  const filteredNewApps = newApps.filter((app) => !developerAppIds.includes(app.id))

  return [...developerApps, ...filteredOldApps, ...filteredNewApps]
}

export const filterOrgAdminRestrictedApps = (
  appsResponse: AppSummaryModelPagedResult,
  connectSession: ReapitConnectSession,
) => {
  const isOrgAdmin = connectSession.loginIdentity.groups.includes(COGNITO_GROUP_ORGANISATION_ADMIN)
  if (isOrgAdmin || !appsResponse || !appsResponse.data || !window.reapit) return appsResponse
  const filtered = appsResponse.data.filter(
    (app) => !window.reapit.config.orgAdminRestrictedAppIds.includes(app.id as string),
  )
  return {
    ...appsResponse,
    data: filtered,
  }
}
