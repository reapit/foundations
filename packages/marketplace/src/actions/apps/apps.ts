import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { AppDetailModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { FetchAppByIdParams, FetchAppsParams } from '@/services/apps'

export const fetchApps = actionCreator<FetchAppsParams & { preview?: boolean; isInfinite?: boolean }>(
  ActionTypes.FETCH_APPS,
)
export const fetchDeveloperApps = actionCreator<FetchAppsParams & { developerId?: string[] }>(
  ActionTypes.FETCH_DEVELOPER_APPS,
)
export const fetchAppsInfiniteSuccess = actionCreator<AppSummaryModelPagedResult>(
  ActionTypes.FETCH_APPS_INFINITE_SUCCESS,
)
export const fetchDeveloperAppsSuccess = actionCreator<AppSummaryModelPagedResult>(
  ActionTypes.FETCH_DEVELOPER_APPS_SUCCESS,
)
export const fetchAppsSuccess = actionCreator<AppSummaryModelPagedResult>(ActionTypes.FETCH_APPS_SUCCESS)
export const fetchAppsFailed = actionCreator<string>(ActionTypes.FETCH_APPS_FAILED)

export const fetchFeatureApps = actionCreator<FetchAppsParams & { preview?: boolean }>(ActionTypes.FETCH_FEATURE_APPS)
export const fetchFeatureAppsSuccess = actionCreator<AppSummaryModelPagedResult>(ActionTypes.FETCH_FEATURE_APPS_SUCCESS)
export const fetchFeatureAppsFailed = actionCreator<string>(ActionTypes.FETCH_FEATURE_APPS_FAILED)

export const fetchAppDetail = actionCreator<FetchAppByIdParams>(ActionTypes.FETCH_APP_DETAIL)
export const fetchAppDetailSuccess = actionCreator<AppDetailModel>(ActionTypes.FETCH_APP_DETAIL_SUCCESS)
export const fetchAppDetailFailed = actionCreator<string>(ActionTypes.FETCH_APP_DETAIL_FAILED)
