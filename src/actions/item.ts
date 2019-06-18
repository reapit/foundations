import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ItemItem } from '../reducers/item'

export const itemRequestData = actionCreator<void>(ActionTypes.ITEM_REQUEST_DATA)
export const itemLoading = actionCreator<boolean>(ActionTypes.ITEM_LOADING)
export const itemReceiveData = actionCreator<ItemItem | undefined>(ActionTypes.ITEM_RECEIVE_DATA)
export const itemClearData = actionCreator<null>(ActionTypes.ITEM_CLEAR_DATA)
