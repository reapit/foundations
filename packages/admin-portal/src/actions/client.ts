import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { ClientAppSummary, ClientAppSummaryParams } from '@/reducers/client/app-summary'
import { AppDetailData } from '@/reducers/client/app-detail'
import { FetchAppByIdParams } from '@/services/apps'
import {
  UpdateWebComponentConfigParams,
  FetchWebComponentConfigParams,
  WebComponentConfigResult,
} from '@/services/web-component'
import { NegotiatorsResult } from '@/services/negotiators'

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

export const clientFetchNegotiatorsSuccess = actionCreator<NegotiatorsResult>(
  ActionTypes.CLIENT_FETCH_NEGOTIATORS_SUCCESS,
)
