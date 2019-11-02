import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FormState } from '@/types/core'
import { DynamicLinkParams } from '@reapit/elements'

export const submitCompleteSetFormState = actionCreator<FormState>(ActionTypes.SUBMIT_COMPLETE_SET_FORM_STATE)

export const submitComplete = actionCreator<{ id: string; dynamicLinkParams: DynamicLinkParams }>(
  ActionTypes.SUBMIT_COMPLETE
)
