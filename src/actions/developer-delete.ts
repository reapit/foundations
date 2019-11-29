import { actionCreator } from './../utils/actions'
import ActionTypes from '../constants/action-types'

export const developerDeleteRequest = actionCreator<string>(ActionTypes.DEVELOPER_DELETE_REQUEST)
export const developerDeleteRequestLoading = actionCreator<void>(ActionTypes.DEVELOPER_DELETE_REQUEST_LOADING)
export const developerDeleteRequestFailure = actionCreator<void>(ActionTypes.DEVELOPER_DELETE_REQUEST_FAILURE)
export const developerDeleteRequestSuccess = actionCreator<void>(ActionTypes.DEVELOPER_DELETE_REQUEST_SUCCESS)
export const developerDeleteSetInitFormState = actionCreator<void>(ActionTypes.DEVELOPER_DELETE_SET_INIT_FORM_STATE)
