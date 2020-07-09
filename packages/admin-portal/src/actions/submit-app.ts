import { FormikHelpers } from '@reapit/elements'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'
import { FormStep } from '@/reducers/submit-app'
import { HandleSubmitParams } from '@/components/ui/submit-app-wizard/submit-app-wizard'

export type SubmitAppFormikActions = FormikHelpers<CustomCreateAppModel>

export type CustomCreateAppModel = Pick<CreateAppModel, 'name' | 'authFlow' | 'scopes'> & {
  redirectUris?: string
  signoutUris?: string
}
export type SubmitAppArgs = CreateAppModel &
  Pick<HandleSubmitParams, 'setWizardStep'> &
  Pick<FormikHelpers<CustomCreateAppModel>, 'setErrors' | 'setFieldValue'>

export type WizardChangeStepModel = {
  formStep: FormStep
}

export const submitApp = actionCreator<SubmitAppArgs>(ActionTypes.DEVELOPER_SUBMIT_APP)
export const submitAppSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
export const submitAppLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_SUBMIT_APP_LOADING)
export const submitAppRequestData = actionCreator<void>(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA)
export const submitAppReceiveData = actionCreator<ScopeModel[]>(ActionTypes.DEVELOPER_SUBMIT_APP_RECEIVE_DATA)
