import { Action, FormState } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  requestDeleteAppLoading,
  requestDeleteAppSuccess,
  requestDeleteAppFailed,
  setDeleteAppInitFormState,
} from '@/actions/app-delete'

const appDeleteReducer = (state: FormState = 'PENDING', action: Action<any>): FormState => {
  if (isType(action, requestDeleteAppLoading)) {
    return 'SUBMITTING'
  }

  if (isType(action, requestDeleteAppSuccess)) {
    return 'SUCCESS'
  }

  if (isType(action, requestDeleteAppFailed)) {
    return 'ERROR'
  }

  if (isType(action, setDeleteAppInitFormState)) {
    return 'PENDING'
  }

  return state
}

export default appDeleteReducer
