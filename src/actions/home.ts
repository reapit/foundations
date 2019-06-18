import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { HomeItem } from '../reducers/home'

export const homeRequestData = actionCreator<void>(ActionTypes.HOME_REQUEST_DATA)
export const homeLoading = actionCreator<boolean>(ActionTypes.HOME_LOADING)
export const homeReceiveData = actionCreator<HomeItem | undefined>(ActionTypes.HOME_RECEIVE_DATA)
export const homeClearData = actionCreator<null>(ActionTypes.HOME_CLEAR_DATA)
