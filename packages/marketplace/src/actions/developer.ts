import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DeveloperItem, DeveloperRequestParams } from '../reducers/developer'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '../types/core'

export const developerRequestData = actionCreator<DeveloperRequestParams>(ActionTypes.DEVELOPER_REQUEST_DATA)
export const developerRequestDataFailure = actionCreator<void>(ActionTypes.DEVELOPER_REQUEST_DATA_FAILURE)
export const developerLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_LOADING)
export const developerReceiveData = actionCreator<DeveloperItem | undefined>(ActionTypes.DEVELOPER_RECEIVE_DATA)
export const developerClearData = actionCreator<null>(ActionTypes.DEVELOPER_CLEAR_DATA)
export const developerCreate = actionCreator<CreateDeveloperModel>(ActionTypes.DEVELOPER_CREATE)
export const developerSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SET_FORM_STATE)
