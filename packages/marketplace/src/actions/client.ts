import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ClientAppSummary, ClientAppSummaryParams } from '../reducers/client/app-summary'
import { AppDetailData } from '@/reducers/client/app-detail'

export interface ClientAppDetailParams {
  id: string
  clientId?: string
}

export const clientAppSummaryRequestData = actionCreator<ClientAppSummaryParams>(
  ActionTypes.CLIENT_APP_SUMMARY_REQUEST_DATA,
)
export const clientAppSummaryReceiveData = actionCreator<ClientAppSummary | undefined>(
  ActionTypes.CLIENT_APP_SUMMARY_RECEIVE_DATA,
)
export const clientAppSummaryRequestDataFailure = actionCreator<string>(ActionTypes.CLIENT_APP_SUMMARY_REQUEST_FAILURE)
export const clientAppSummaryClearData = actionCreator<null>(ActionTypes.CLIENT_APP_SUMMARY_CLEAR_DATA)

// Client App Detail
export const clientAppDetailRequestData = actionCreator<ClientAppDetailParams>(
  ActionTypes.CLIENT_APP_DETAIL_REQUEST_DATA,
)
export const clientAppDetailReceiveData = actionCreator<AppDetailData>(ActionTypes.CLIENT_APP_DETAIL_RECEIVE_DATA)
export const clientAppDetailRequestFailure = actionCreator<string>(ActionTypes.CLIENT_APP_DETAIL_REQUEST_FAILURE)
