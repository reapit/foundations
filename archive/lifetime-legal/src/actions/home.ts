import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const homeRequestData = actionCreator<void>(ActionTypes.HOME_REQUEST_DATA)
export const homeReceiveData = actionCreator<{}>(ActionTypes.HOME_RECEIVE_DATA)
export const homeRequestDataFailure = actionCreator<void>(ActionTypes.HOME_REQUEST_FAILURE)
export const homeLoading = actionCreator<boolean>(ActionTypes.HOME_LOADING)
export const homeClearData = actionCreator<null>(ActionTypes.HOME_CLEAR_DATA)
