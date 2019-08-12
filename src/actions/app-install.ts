import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const appInstallRequestData = actionCreator<void>(ActionTypes.APP_INSTALL_REQUEST_DATA)
export const appInstallLoading = actionCreator<void>(ActionTypes.APP_INSTALL_LOADING)
export const appInstallRequestDataFailure = actionCreator<void>(ActionTypes.APP_INSTALL_REQUEST_DATA_FAILURE)
export const appInstallRequestSuccess = actionCreator<void>(ActionTypes.APP_INSTALL_REQUEST_DATA_SUCCESS)
export const appInstallDone = actionCreator<void>(ActionTypes.APP_INSTALL_DONE)
