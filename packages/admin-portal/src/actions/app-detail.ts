import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppDetailItem } from '@/reducers/apps/detail'
// import { AppClientSecretModel } from '@/types/marketplace-api-schema'

export interface AppDetailParams {
  id: string
  clientId?: string
}

export const fetchAppDetailData = actionCreator<AppDetailParams>(ActionTypes.FETCH_APP_DETAIL_DATA)
export const fetchAppDetailLoading = actionCreator<boolean>(ActionTypes.FETCH_APP_DETAIL_LOADING)
export const receiveAppDetailData = actionCreator<{ data: AppDetailItem } | undefined>(
  ActionTypes.RECEIVE_FETCH_APP_DETAIL_DATA,
)
export const fetchAppDetailFailed = actionCreator<string | void>(ActionTypes.FETCH_APP_DETAIL_DATA_FAILURE)
export const setAppDetailStale = actionCreator<boolean>(ActionTypes.APP_DETAIL_IS_STALE)
