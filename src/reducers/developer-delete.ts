import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  developerDeleteSetInitFormState,
  developerDeleteRequestSuccess,
  developerDeleteRequestLoading,
  developerDeleteRequestFailure
} from '../actions/developer-delete'
import { RequestState } from './../types/core'

export const defaultState: RequestState = {
  formState: 'PENDING'
}

const developerDeleteReducer = (state: RequestState = defaultState, action: Action<any>): RequestState => {
  if (isType(action, developerDeleteRequestLoading)) {
    return { formState: 'SUBMITTING' }
  }

  if (isType(action, developerDeleteRequestSuccess)) {
    return { formState: 'SUCCESS' }
  }

  if (isType(action, developerDeleteRequestFailure)) {
    return { formState: 'ERROR' }
  }

  if (isType(action, developerDeleteSetInitFormState)) {
    return { formState: 'PENDING' }
  }

  return state
}

export default developerDeleteReducer
