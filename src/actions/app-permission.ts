import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FormState } from '../types/core'
import { ScopeModel } from '@/types/marketplace-api-schema'

export const appPermissionRequestData = actionCreator<string>(ActionTypes.APP_PERMISION_REQUEST_DATA)
export const appPermissionRequestDataFailure = actionCreator<void>(ActionTypes.APP_PERMISION_REQUEST_DATA_FAILURE)
export const appPermissionLoading = actionCreator<boolean>(ActionTypes.APP_PERMISION_LOADING)
export const appPermissionReceiveData = actionCreator<ScopeModel[] | undefined>(ActionTypes.APP_PERMISION_RECEIVE_DATA)
