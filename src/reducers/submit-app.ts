import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { submitAppSetFormState } from '../actions/submit-app'

export interface SubmitAppState {
  formState: FormState
}

export const defaultState: SubmitAppState = {
  formState: 'PENDING'
}

const submitAppReducer = (state: SubmitAppState | undefined = defaultState, action: Action<any>): SubmitAppState => {
  if (isType(action, submitAppSetFormState)) {
    return {
      ...state,
      formState: (action.data as FormState) || null
    }
  }

  return state
}

export default submitAppReducer
