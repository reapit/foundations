import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  appInstallRequestSuccess,
  appInstallRequestDataFailure,
  appInstallLoading,
  appInstallDone
} from '@/actions/app-install'
import { FormState } from '@/types/core'

export interface AppInstallState {
  formState: FormState
}

export const defaultState: AppInstallState = {
  formState: 'PENDING'
}

const appInstallReducer = (state: AppInstallState = defaultState, action: Action<any>): AppInstallState => {
  if (isType(action, appInstallLoading)) {
    return { formState: 'SUBMITTING' }
  }

  if (isType(action, appInstallRequestSuccess)) {
    return { formState: 'SUCCESS' }
  }

  if (isType(action, appInstallRequestDataFailure)) {
    return { formState: 'ERROR' }
  }

  if (isType(action, appInstallDone)) {
    return { formState: 'PENDING' }
  }

  return state
}

export default appInstallReducer
