import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { InstalledAppsItem } from '@/reducers/installed-apps'
import {
  AppDetailModel,
  PagedResultAppSummaryModel_,
  PagedResultNegotiatorModel_,
} from '@reapit/foundations-ts-definitions'
import { ClientAppSummary, ClientAppSummaryParams } from '@/reducers/client/app-summary'
import { AppDetailData } from '@/reducers/client/app-detail'
import { FetchAppByIdParams, FetchAppsApiParams } from '@/services/apps'
import { FetchWebComponentConfigParams } from '@/services/web-component'

export const fetchApps = actionCreator<FetchAppsApiParams>(ActionTypes.FETCH_APPS)
export const fetchAppsSuccess = actionCreator<PagedResultAppSummaryModel_>(ActionTypes.FETCH_APPS_SUCESS)
export const fetchAppsFailed = actionCreator<string>(ActionTypes.FETCH_APPS_FAILURE)

export const fetchFeatureApps = actionCreator<FetchAppsApiParams>(ActionTypes.FETCH_FEATURE_APPS)
export const fetchFeatureAppsSuccess = actionCreator<PagedResultAppSummaryModel_>(ActionTypes.FETCH_FEATURE_APPS_SUCESS)
export const fetchFeatureAppsFailed = actionCreator<string>(ActionTypes.FETCH_FEATURE_APPS_FAILURE)

export const fetchAppDetail = actionCreator<FetchAppByIdParams>(ActionTypes.FETCH_APP_DETAIL)
export const fetchAppDetailSuccess = actionCreator<AppDetailModel>(ActionTypes.FETCH_APP_DETAIL_SUCCESS)
export const fetchAppDetailFailure = actionCreator<string>(ActionTypes.FETCH_APP_DETAIL_FAILURE)

// App Detail
export interface AppDetailParams {
  id: string
  clientId?: string
}

// Apps List Installed
export const installedAppsRequestData = actionCreator<number>(ActionTypes.INSTALLED_APPS_REQUEST_DATA)
export const installedAppsRequestDataFailure = actionCreator<void>(ActionTypes.INSTALLED_APPS_REQUEST_DATA_FAILURE)
export const installedAppsLoading = actionCreator<boolean>(ActionTypes.INSTALLED_APPS_LOADING)
export const installedAppsReceiveData = actionCreator<InstalledAppsItem | undefined>(
  ActionTypes.INSTALLED_APPS_RECEIVE_DATA,
)
export const installedAppsClearData = actionCreator<null>(ActionTypes.INSTALLED_APPS_CLEAR_DATA)

// Client Fetch
export const clientFetchAppSummary = actionCreator<ClientAppSummaryParams>(ActionTypes.CLIENT_FETCH_APP_SUMMARY)
export const clientFetchAppSummarySuccess = actionCreator<ClientAppSummary | undefined>(
  ActionTypes.CLIENT_FETCH_APP_SUMMARY_SUCCESS,
)
export const clientFetchAppSummaryFailed = actionCreator<string>(ActionTypes.CLIENT_FETCH_APP_SUMMARY_FAILED)
export const clientClearAppSummary = actionCreator<null>(ActionTypes.CLIENT_CLEAR_APP_SUMMARY)

// Client App Detail
export const clientFetchAppDetail = actionCreator<FetchAppByIdParams>(ActionTypes.CLIENT_FETCH_APP_DETAIL)
export const clientFetchAppDetailSuccess = actionCreator<AppDetailData>(ActionTypes.CLIENT_FETCH_APP_DETAIL_SUCCESS)
export const clientFetchAppDetailFailed = actionCreator<string>(ActionTypes.CLIENT_FETCH_APP_DETAIL_FAILED)

export const clientFetchWebComponentConfig = actionCreator<FetchWebComponentConfigParams>(
  ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG,
)
