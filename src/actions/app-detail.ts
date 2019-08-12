import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppDetailItem } from '../reducers/app-detail'

export const appDetailRequestData = actionCreator<string>(ActionTypes.APP_DETAIL_REQUEST_DATA)
export const appDetailLoading = actionCreator<boolean>(ActionTypes.APP_DETAIL_LOADING)
export const appDetailReceiveData = actionCreator<AppDetailItem | undefined>(ActionTypes.APP_DETAIL_RECEIVE_DATA)
export const appDetailFailure = actionCreator<void>(ActionTypes.APP_DETAIL_REQUEST_DATA_FAILURE)
export const appDetailClearData = actionCreator<null>(ActionTypes.APP_DETAIL_CLEAR_DATA)
