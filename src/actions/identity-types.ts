import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ListItemModel } from '@/types/platform'

export const identityTypesRequestData = actionCreator<void>(ActionTypes.IDENTITY_TYPES_REQUEST_DATA)
export const identityTypesReceiveData = actionCreator<ListItemModel[]>(ActionTypes.IDENTITY_TYPES_RECEIVE_DATA)
export const identityTypesRequestFailure = actionCreator<void>(ActionTypes.IDENTITY_TYPES_REQUEST_FAILURE)
