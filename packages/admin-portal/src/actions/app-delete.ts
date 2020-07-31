import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const requestDeleteApp = actionCreator<string>(ActionTypes.DELETE_REQUEST_APP)
export const requestDeleteAppFailed = actionCreator<void>(ActionTypes.DELETE_REQUEST_APP_FAILED)
export const requestDeleteAppSuccess = actionCreator<void>(ActionTypes.DELETE_REQUEST_APP_SUCCESS)
export const setDeleteAppInitFormState = actionCreator<void>(ActionTypes.SET_APP_DELETE_INIT_FORM_STATE)
