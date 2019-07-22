import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { CreateAppModel } from '@/types/marketplace-api-schema'

export const submitApp = actionCreator<CreateAppModel>(ActionTypes.DEVELOPER_SUBMIT_APP)
export const submitAppSetFormState = actionCreator<string>(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
