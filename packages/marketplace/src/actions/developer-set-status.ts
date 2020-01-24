import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export const developerSetStatusRequest = actionCreator<DeveloperModel>(ActionTypes.DEVELOPER_SET_STATUS_REQUEST)
export const developerSetStatusRequestLoading = actionCreator<void>(ActionTypes.DEVELOPER_SET_STATUS_REQUEST_LOADING)
export const developerSetStatusRequestFailure = actionCreator<void>(ActionTypes.DEVELOPER_SET_STATUS_REQUEST_FAILURE)
export const developerSetStatusRequestSuccess = actionCreator<void>(ActionTypes.DEVELOPER_SET_STATUS_REQUEST_SUCCESS)
export const developerSetStatusSetInitFormState = actionCreator<void>(
  ActionTypes.DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE,
)
