import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppDetailItem } from '../reducers/app-detail'
import { AppClientSecretModel } from '@/types/marketplace-api-schema'

export interface AppDetailParams {
  id: string
  clientId?: string
}

export const appDetailRequestData = actionCreator<AppDetailParams>(ActionTypes.APP_DETAIL_REQUEST_DATA)
export const appDetailLoading = actionCreator<boolean>(ActionTypes.APP_DETAIL_LOADING)
export const appDetailReceiveData = actionCreator<AppDetailItem | undefined>(ActionTypes.APP_DETAIL_RECEIVE_DATA)
export const appDetailFailure = actionCreator<void>(ActionTypes.APP_DETAIL_REQUEST_DATA_FAILURE)
export const appDetailClearData = actionCreator<null>(ActionTypes.APP_DETAIL_CLEAR_DATA)
export const setAppDetailStale = actionCreator<boolean>(ActionTypes.APP_DETAIL_IS_STALE)

export const requestAuthenticationCode = actionCreator<string>(ActionTypes.REQUEST_AUTHENTICATION_CODE)
export const requestAuthenticationSuccess = actionCreator<AppClientSecretModel>(
  ActionTypes.REQUEST_AUTHENTICATION_CODE_SUCCESS
)
export const requestAuthenticationFailure = actionCreator<void>(ActionTypes.REQUEST_AUTHENTICATION_CODE_FAILURE)
export const removeAuthenticationCode = actionCreator<void>(ActionTypes.REMOVE_AUTHENTICATION_CODE)
