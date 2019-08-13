import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const appUninstallRequestData = actionCreator<void>(ActionTypes.APP_UNINSTALL_REQUEST_DATA)
export const appUninstallLoading = actionCreator<void>(ActionTypes.APP_UNINSTALL_LOADING)
export const appUninstallRequestDataFailure = actionCreator<void>(ActionTypes.APP_UNINSTALL_REQUEST_DATA_FAILURE)
export const appUninstallRequestSuccess = actionCreator<void>(ActionTypes.APP_UNINSTALL_REQUEST_DATA_SUCCESS)
export const appUninstallDone = actionCreator<void>(ActionTypes.APP_UNINSTALL_DONE)
