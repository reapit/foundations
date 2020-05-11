import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ClientAppSummary, ClientAppSummaryParams } from '../reducers/client/app-summary'
import { AppDetailData } from '@/reducers/client/app-detail'
import { FetchAppDetailParams } from '@/services/apps'

export const clientAppSummaryRequestData = actionCreator<ClientAppSummaryParams>(
  ActionTypes.CLIENT_APP_SUMMARY_REQUEST_DATA,
)
export const clientAppSummaryReceiveData = actionCreator<ClientAppSummary | undefined>(
  ActionTypes.CLIENT_APP_SUMMARY_RECEIVE_DATA,
)
export const clientAppSummaryRequestDataFailure = actionCreator<string>(ActionTypes.CLIENT_APP_SUMMARY_REQUEST_FAILURE)
export const clientAppSummaryClearData = actionCreator<null>(ActionTypes.CLIENT_APP_SUMMARY_CLEAR_DATA)

// Client App Detail
export const clientFetchAppDetail = actionCreator<FetchAppDetailParams>(ActionTypes.CLIENT_FETCH_APP_DETAIL)
export const clientFetchAppDetailSuccess = actionCreator<AppDetailData>(ActionTypes.CLIENT_FETCH_APP_DETAIL_SUCCESS)
export const clientFetchAppDetailFailed = actionCreator<string>(ActionTypes.CLIENT_FETCH_APP_DETAIL_FAILED)
