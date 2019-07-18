import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { SubmitAppFormValues } from '../components/pages/developer-submit-app'

export const submitApp = actionCreator<SubmitAppFormValues>(ActionTypes.DEVELOPER_SUBMIT_APP)
export const submitAppSetFormState = actionCreator<string>(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
