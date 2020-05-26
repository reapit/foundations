import { FormikHelpers } from '@reapit/elements'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'

export type SubmitAppFormikActions = FormikHelpers<CustomCreateAppModel>
export type SubmitAppArgs = CreateAppModel & { actions: SubmitAppFormikActions } & {
  setSubmitError?: (error: string) => void
}
export type CustomCreateAppModel = Omit<CreateAppModel, 'redirectUris' | 'signoutUris' | 'limitToClientIds'> & {
  redirectUris?: string
  signoutUris?: string
  limitToClientIds?: string
  isPrivateApp?: string
}

export const submitApp = actionCreator<SubmitAppArgs>(ActionTypes.DEVELOPER_SUBMIT_APP)
export const submitAppSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
export const submitAppLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_SUBMIT_APP_LOADING)
export const submitAppRequestData = actionCreator<void>(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA)
export const submitAppReceiveData = actionCreator<ScopeModel[]>(ActionTypes.DEVELOPER_SUBMIT_APP_RECEIVE_DATA)
