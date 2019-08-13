import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  appUninstallRequestSuccess,
  appUninstallRequestDataFailure,
  appUninstallLoading,
  appUninstallDone
} from '@/actions/app-uninstall'
import { FormState } from '@/types/core'

export interface AppUninstallState {
  formState: FormState
}

export const defaultState: AppUninstallState = {
  formState: 'PENDING'
}

const appUninstallReducer = (state: AppUninstallState = defaultState, action: Action<any>): AppUninstallState => {
  if (isType(action, appUninstallLoading)) {
    return { ...state, formState: 'SUBMITTING' }
  }

  if (isType(action, appUninstallRequestSuccess)) {
    return { ...state, formState: 'SUCCESS' }
  }

  if (isType(action, appUninstallRequestDataFailure)) {
    return { ...state, formState: 'ERROR' }
  }

  if (isType(action, appUninstallDone)) {
    return { ...state, formState: 'PENDING' }
  }

  return state
}

export default appUninstallReducer
