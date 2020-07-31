import { Action, FormState } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  developerSetStatusSetInitFormState,
  developerSetStatusRequestSuccess,
  developerSetStatusRequestLoading,
  developerSetStatusRequestFailure,
} from '../../actions/developer-set-status'

const developerSetStatusReducer = (state: FormState = 'PENDING', action: Action<any>): FormState => {
  if (isType(action, developerSetStatusRequestLoading)) {
    return 'SUBMITTING'
  }

  if (isType(action, developerSetStatusRequestSuccess)) {
    return 'SUCCESS'
  }

  if (isType(action, developerSetStatusRequestFailure)) {
    return 'ERROR'
  }

  if (isType(action, developerSetStatusSetInitFormState)) {
    return 'PENDING'
  }

  return state
}

export default developerSetStatusReducer
