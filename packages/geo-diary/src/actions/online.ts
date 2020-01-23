import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const setOnline = actionCreator<boolean>(ActionTypes.ONLINE)
export const setOffline = actionCreator<boolean>(ActionTypes.OFFLINE)
