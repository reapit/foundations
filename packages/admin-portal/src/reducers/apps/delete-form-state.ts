import { Action, FormState } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  appDeleteRequestLoading,
  appDeleteRequestSuccess,
  appDeleteRequestFailure,
  appDeleteSetInitFormState,
} from '@/actions/app-delete'

const appDeleteReducer = (state: FormState = 'PENDING', action: Action<any>): FormState => {
  if (isType(action, appDeleteRequestLoading)) {
    return 'SUBMITTING'
  }

  if (isType(action, appDeleteRequestSuccess)) {
    return 'SUCCESS'
  }

  if (isType(action, appDeleteRequestFailure)) {
    return 'ERROR'
  }

  if (isType(action, appDeleteSetInitFormState)) {
    return 'PENDING'
  }

  return state
}

export default appDeleteReducer
