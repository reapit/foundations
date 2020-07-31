import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { FetchAppsParams } from '@/services/apps'

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
  oldApps: AppSummaryModel[] | undefined = [],
  newApps: AppSummaryModel[] | undefined = [],
): AppSummaryModel[] => {
  const newAppIds = newApps.map(app => app.id)
  const filteredOldApps = oldApps.filter(app => !newAppIds.includes(app.id))

  return [...filteredOldApps, ...newApps]
}

export const generateParamsForPreviewApps = (
  defaultParams: FetchAppsParams,
  preview?: boolean,
): {
  fetchAppsParams: FetchAppsParams
  fetchFeatureAppsParams: FetchAppsParams
} => {
  if (!preview) {
    return { fetchAppsParams: defaultParams, fetchFeatureAppsParams: defaultParams }
  }

  const featuredAppsExternalAppIds = preview ? window.reapit.config.previewFeaturedExternalAppIds : undefined
  const mainAppsExternalAppIds = preview ? window.reapit.config.previewExternalAppIds : undefined

  const { pageNumber, pageSize } = defaultParams

  const baseParams = { pageSize, pageNumber }

  return {
    fetchAppsParams: { ...baseParams, externalAppId: mainAppsExternalAppIds },
    fetchFeatureAppsParams: {
      ...baseParams,
      externalAppId: featuredAppsExternalAppIds,
    },
  }
}
