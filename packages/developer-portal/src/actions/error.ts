import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ErrorData } from '../reducers/error'

export const errorClearedComponent = actionCreator<null>(ActionTypes.ERROR_CLEARED_COMPONENT)
export const errorClearedServer = actionCreator<null>(ActionTypes.ERROR_CLEARED_SERVER)
export const errorThrownComponent = actionCreator<ErrorData>(ActionTypes.ERROR_THROWN_COMPONENT)
export const errorThrownServer = actionCreator<ErrorData>(ActionTypes.ERROR_THROWN_SERVER)
