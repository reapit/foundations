import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { submitRevisionSetFormState } from '../actions/submit-revision'

export interface SubmitRevisionState {
  formState: FormState
}

export const defaultState: SubmitRevisionState = {
  formState: 'PENDING',
}

const submitRevisionReducer = (
  state: SubmitRevisionState | undefined = defaultState,
  action: Action<any>,
): SubmitRevisionState => {
  if (isType(action, submitRevisionSetFormState)) {
    return {
      ...state,
      formState: (action.data as FormState) || null,
    }
  }

  return state
}

export default submitRevisionReducer
