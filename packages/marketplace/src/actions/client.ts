import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { ClientAppSummary, ClientAppSummaryParams } from '@/reducers/client/app-summary'
import { AppDetailData } from '@/reducers/client/app-detail'
import { FetchAppByIdParams } from '@/services/apps'

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
