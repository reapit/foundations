import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppDetailItem } from '@/reducers/apps/detail'
// import { AppClientSecretModel } from '@/types/marketplace-api-schema'

export interface AppDetailParams {
  id: string
  clientId?: string
}

export const appDetailRequestData = actionCreator<AppDetailParams>(ActionTypes.APP_DETAIL_REQUEST_DATA)
export const appDetailLoading = actionCreator<boolean>(ActionTypes.APP_DETAIL_LOADING)
export const appDetailReceiveData = actionCreator<{ data: AppDetailItem } | undefined>(
  ActionTypes.APP_DETAIL_RECEIVE_DATA,
)
export const appDetailFailure = actionCreator<string | void>(ActionTypes.APP_DETAIL_REQUEST_DATA_FAILURE)
export const appDetailClearData = actionCreator<null>(ActionTypes.APP_DETAIL_CLEAR_DATA)
export const setAppDetailStale = actionCreator<boolean>(ActionTypes.APP_DETAIL_IS_STALE)
