import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { submitCompleteSetFormState } from '../actions/success'

export interface SuccessState {
  submitCompleteFormState: FormState
}

export const defaultState: SuccessState = {
  submitCompleteFormState: 'PENDING',
}

const successReducer = (state: SuccessState | undefined = defaultState, action: Action<any>): SuccessState => {
  if (isType(action, submitCompleteSetFormState)) {
    return {
      ...state,
      submitCompleteFormState: action.data || null,
    }
  }
  return state
}

export default successReducer
