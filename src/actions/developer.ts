import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DeveloperItem } from '../reducers/developer'

export const developerRequestData = actionCreator<void>(ActionTypes.DEVELOPER_REQUEST_DATA)
export const developerLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_LOADING)
export const developerReceiveData = actionCreator<DeveloperItem | undefined>(ActionTypes.DEVELOPER_RECEIVE_DATA)
export const developerClearData = actionCreator<null>(ActionTypes.DEVELOPER_CLEAR_DATA)
