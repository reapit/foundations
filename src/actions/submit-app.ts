import { FormikActions } from 'formik'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppModel, ScopeModel } from '@/types/marketplace-api-schema'
import { FormState } from '@/types/core'

export type SubmitAppFormikActions = FormikActions<CreateAppModel>
export type SubmitAppArgs = CreateAppModel & { actions: SubmitAppFormikActions }

export const submitApp = actionCreator<SubmitAppArgs>(ActionTypes.DEVELOPER_SUBMIT_APP)
export const submitAppSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
export const submitAppLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_SUBMIT_APP_LOADING)
export const submitAppRequestData = actionCreator<void>(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA)
export const submitAppReceiveData = actionCreator<ScopeModel[]>(ActionTypes.DEVELOPER_SUBMIT_APP_RECEIVE_DATA)
