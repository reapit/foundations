import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'

export type UpdateDeveloperModelRequest = {
  callback?: (success: boolean) => void
} & UpdateDeveloperModel

export const setRequestDeveloperStatusFormState = actionCreator<UpdateDeveloperModelRequest>(
  ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE,
)
export const setRequestDeveloperStatusFormStateLoading = actionCreator<void>(
  ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE_LOADING,
)
export const setRequestDeveloperStatusFormStateFailed = actionCreator<void>(
  ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE_FAILED,
)
export const setRequestDeveloperStatusFormStateSuccess = actionCreator<void>(
  ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE_SUCCESS,
)

export const initRequestDeveloperStatusFormState = actionCreator<void>(
  ActionTypes.INIT_REQUEST_DEVELOPER_STATUS_FORM_STATE,
)
