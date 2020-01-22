import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { submitChecksSetFormState } from '../actions/submit-checks'

export interface SubmitChecksState {
  formState: FormState
}

export const defaultState: SubmitChecksState = {
  formState: 'PENDING'
}

const submitRelevantChecks = (
  state: SubmitChecksState | undefined = defaultState,
  action: Action<any>
): SubmitChecksState => {
  if (isType(action, submitChecksSetFormState)) {
    return {
      ...state,
      formState: action.data || null
    }
  }
  return state
}

export default submitRelevantChecks
