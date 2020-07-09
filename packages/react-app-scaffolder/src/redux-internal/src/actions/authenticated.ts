import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const authenticatedRequestData = actionCreator<void>(ActionTypes.AUTHENTICATED_REQUEST_DATA)
export const authenticatedReceiveData = actionCreator<{}>(ActionTypes.AUTHENTICATED_RECEIVE_DATA)
export const authenticatedRequestDataFailure = actionCreator<void>(ActionTypes.AUTHENTICATED_REQUEST_FAILURE)
export const authenticatedLoading = actionCreator<boolean>(ActionTypes.AUTHENTICATED_LOADING)
export const authenticatedClearData = actionCreator<null>(ActionTypes.AUTHENTICATED_CLEAR_DATA)
