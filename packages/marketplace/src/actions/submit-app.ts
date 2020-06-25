import { FormikHelpers } from '@reapit/elements'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'
import { FormStep } from '@/reducers/submit-app'
import { FormikErrors } from '@reapit/elements'
import { OnFinishParams } from '@/components/ui/submit-app-wizzard/steps/step-submit-app-success'

export type SubmitAppFormikActions = FormikHelpers<CustomCreateAppModel>

export type CustomCreateAppModel = Pick<CreateAppModel, 'name' | 'authFlow' | 'scopes'> & {
  redirectUris?: string
  signoutUris?: string
}
export type SubmitAppArgs = CreateAppModel &
  Pick<OnFinishParams, 'setWizzardStep' | 'afterClose'> & {
    setErrors: (errors: FormikErrors<CustomCreateAppModel>) => void
  }

export type WizzardChangeStepModel = {
  formStep: FormStep
}

export const submitApp = actionCreator<SubmitAppArgs>(ActionTypes.DEVELOPER_SUBMIT_APP)
export const submitAppSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
export const submitAppLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_SUBMIT_APP_LOADING)
export const submitAppRequestData = actionCreator<void>(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA)
export const submitAppReceiveData = actionCreator<ScopeModel[]>(ActionTypes.DEVELOPER_SUBMIT_APP_RECEIVE_DATA)
