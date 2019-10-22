import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FormState } from '@/types/core'
import { DynamicLinkParams } from '@reapit/elements'

export const submitChecks = actionCreator<{ id: string; dynamicLinkParams: DynamicLinkParams }>(
  ActionTypes.SUBMIT_CHECKS
)
export const submitChecksSetFormState = actionCreator<FormState>(ActionTypes.SUBMIT_CHECKS_SET_FORM_STATE)
