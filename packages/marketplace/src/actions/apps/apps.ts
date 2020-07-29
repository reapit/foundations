import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { MyAppsItem } from '@/reducers/my-apps'
import { InstalledAppsItem } from '@/reducers/installed-apps'
import { PagedResultNegotiatorModel_ } from '@reapit/foundations-ts-definitions'
import { ClientAppSummary, ClientAppSummaryParams } from '@/reducers/client/app-summary'
import { AppDetailData } from '@/reducers/client/app-detail'
import { FetchAppByIdParams } from '@/services/apps'
import {
  UpdateWebComponentConfigParams,
  FetchWebComponentConfigParams,
  WebComponentConfigResult,
} from '@/services/web-component'

// Apps
export const myAppsRequestData = actionCreator<number>(ActionTypes.MY_APPS_REQUEST_DATA)
export const myAppsRequestDataFailure = actionCreator<void>(ActionTypes.MY_APPS_REQUEST_DATA_FAILURE)
export const myAppsLoading = actionCreator<boolean>(ActionTypes.MY_APPS_LOADING)
export const myAppsReceiveData = actionCreator<MyAppsItem | undefined>(ActionTypes.MY_APPS_RECEIVE_DATA)
export const myAppsClearData = actionCreator<null>(ActionTypes.MY_APPS_CLEAR_DATA)

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
export const clientFetchWebComponentConfigSuccess = actionCreator<WebComponentConfigResult>(
  ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG_SUCCESS,
)
export const clientFetchWebComponentConfigFailed = actionCreator<void>(
  ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG_FAILED,
)
export const clientUpdateWebComponentConfig = actionCreator<UpdateWebComponentConfigParams>(
  ActionTypes.CLIENT_UPDATE_WEB_COMPONENT_CONFIG,
)
export const clientUpdateWebComponentConfigFailed = actionCreator<void>(
  ActionTypes.CLIENT_UPDATE_WEB_COMPONENT_CONFIG_FAILED,
)

export const clientFetchNegotiatorsSuccess = actionCreator<PagedResultNegotiatorModel_>(
  ActionTypes.CLIENT_FETCH_NEGOTIATORS_SUCCESS,
)
