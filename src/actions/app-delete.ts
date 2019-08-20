import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const appDeleteRequest = actionCreator<void>(ActionTypes.APP_DELETE_REQUEST)
export const appDeleteRequestLoading = actionCreator<void>(ActionTypes.APP_DELETE_REQUEST_LOADING)
export const appDeleteRequestFailure = actionCreator<void>(ActionTypes.APP_DELETE_REQUEST_FAILURE)
export const appDeleteRequestSuccess = actionCreator<void>(ActionTypes.APP_DELETE_REQUEST_SUCCESS)
export const appDeleteSetInitFormState = actionCreator<void>(ActionTypes.APP_DELETE_SET_INIT_FORM_STATE)
