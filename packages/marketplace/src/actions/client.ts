import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ClientItem, ClientParams } from '../reducers/client'

export const clientRequestData = actionCreator<ClientParams>(ActionTypes.CLIENT_REQUEST_DATA)
export const clientRequestDataFailure = actionCreator<void>(ActionTypes.CLIENT_REQUEST_FAILURE)
export const clientLoading = actionCreator<boolean>(ActionTypes.CLIENT_LOADING)
export const clientReceiveData = actionCreator<ClientItem | undefined>(ActionTypes.CLIENT_RECEIVE_DATA)
export const clientClearData = actionCreator<null>(ActionTypes.CLIENT_CLEAR_DATA)
