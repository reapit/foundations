import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import {
  appInstallationsSetFormState,
  appInstallationsReceiveData,
  appInstallationsRequestData,
  appInstallationsRequestDataFailure,
} from '@/actions/app-installations'

export interface AppInstallationsState {
  formState: FormState
  loading: boolean
  installationsAppData: PagedResultInstallationModel_ | null
}

export const defaultState: AppInstallationsState = {
  formState: 'PENDING',
  loading: false,
  installationsAppData: null,
}

const appInstallationsReducer = (
  state: AppInstallationsState = defaultState,
  action: Action<any>,
): AppInstallationsState => {
  if (isType(action, appInstallationsRequestData)) {
    return { ...state, loading: true }
  }

  if (isType(action, appInstallationsReceiveData)) {
    return { ...state, loading: false, installationsAppData: action.data }
  }

  if (isType(action, appInstallationsRequestDataFailure)) {
    return { ...state, loading: false }
  }

  if (isType(action, appInstallationsSetFormState)) {
    return { ...state, formState: action.data }
  }

  return state
}

export default appInstallationsReducer
