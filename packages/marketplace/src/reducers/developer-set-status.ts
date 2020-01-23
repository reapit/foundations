import { Action, RequestState } from '../types/core'
import { isType } from '../utils/actions'
import {
  developerSetStatusSetInitFormState,
  developerSetStatusRequestSuccess,
  developerSetStatusRequestLoading,
  developerSetStatusRequestFailure
} from '../actions/developer-set-status'

export const defaultState: RequestState = {
  formState: 'PENDING'
}

const developerSetStatusReducer = (state: RequestState = defaultState, action: Action<any>): RequestState => {
  if (isType(action, developerSetStatusRequestLoading)) {
    return { formState: 'SUBMITTING' }
  }

  if (isType(action, developerSetStatusRequestSuccess)) {
    return { formState: 'SUCCESS' }
  }

  if (isType(action, developerSetStatusRequestFailure)) {
    return { formState: 'ERROR' }
  }

  if (isType(action, developerSetStatusSetInitFormState)) {
    return { formState: 'PENDING' }
  }

  return state
}

export default developerSetStatusReducer
