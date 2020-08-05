import { Action, FormState } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  initRequestDeveloperStatusFormState,
  setRequestDeveloperStatusFormStateSuccess,
  setRequestDeveloperStatusFormStateLoading,
  setRequestDeveloperStatusFormStateFailed,
} from '../../actions/developer-set-status'

const developerSetStatusReducer = (state: FormState = 'PENDING', action: Action<any>): FormState => {
  if (isType(action, setRequestDeveloperStatusFormStateLoading)) {
    return 'SUBMITTING'
  }

  if (isType(action, setRequestDeveloperStatusFormStateSuccess)) {
    return 'SUCCESS'
  }

  if (isType(action, setRequestDeveloperStatusFormStateFailed)) {
    return 'ERROR'
  }

  if (isType(action, initRequestDeveloperStatusFormState)) {
    return 'PENDING'
  }

  return state
}

export default developerSetStatusReducer
