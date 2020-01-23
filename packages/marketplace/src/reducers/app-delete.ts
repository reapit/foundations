import { isType } from '@/utils/actions'
import {
  appDeleteSetInitFormState,
  appDeleteRequestSuccess,
  appDeleteRequestLoading,
  appDeleteRequestFailure
} from '@/actions/app-delete'
import { RequestState, Action } from '@/types/core'

export const defaultState: RequestState = {
  formState: 'PENDING'
}

const appDeleteReducer = (state: RequestState = defaultState, action: Action<any>): RequestState => {
  if (isType(action, appDeleteRequestLoading)) {
    return { formState: 'SUBMITTING' }
  }

  if (isType(action, appDeleteRequestSuccess)) {
    return { formState: 'SUCCESS' }
  }

  if (isType(action, appDeleteRequestFailure)) {
    return { formState: 'ERROR' }
  }

  if (isType(action, appDeleteSetInitFormState)) {
    return { formState: 'PENDING' }
  }

  return state
}

export default appDeleteReducer
