import { FormikActions } from 'formik'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppModel } from '@/types/marketplace-api-schema'
import { FormState } from '@/types/core'

export type SubmitAppFormikActions = FormikActions<CreateAppModel>
export type SubmitAppArgs = CreateAppModel & { actions: SubmitAppFormikActions }

export const submitApp = actionCreator<SubmitAppArgs>(ActionTypes.DEVELOPER_SUBMIT_APP)
export const submitAppSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
