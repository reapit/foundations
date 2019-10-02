import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FormState } from '@/types/core'

export const submitComplete = actionCreator<void>(ActionTypes.SUBMIT_COMPLETE)
export const submitCompleteSetFormState = actionCreator<FormState>(ActionTypes.SUBMIT_COMPLETE_SET_FORM_STATE)
