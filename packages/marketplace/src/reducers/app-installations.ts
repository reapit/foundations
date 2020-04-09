import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import {
  appInstallationsSetFormState,
  appInstallationsReceiveData,
  appInstallationsRequestData,
  appInstallationsRequestDataFailure,
  appInstallationsFilterReceiveData,
  appInstallationsFilterRequestData,
  appInstallationsFilterRequestDataFailure,
} from '@/actions/app-installations'

export interface AppInstallationsState {
  formState: FormState
  loading: boolean
  loadingFilter: boolean
  installationsAppData: PagedResultInstallationModel_ | null
  installationsFilteredAppData: PagedResultInstallationModel_ | null
}

export const defaultState: AppInstallationsState = {
  formState: 'PENDING',
  loading: false,
  loadingFilter: false,
  installationsAppData: null,
  installationsFilteredAppData: null,
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

  if (isType(action, appInstallationsFilterRequestData)) {
    return { ...state, loadingFilter: true }
  }

  if (isType(action, appInstallationsFilterReceiveData)) {
    return { ...state, loadingFilter: false, installationsFilteredAppData: action.data }
  }

  if (isType(action, appInstallationsFilterRequestDataFailure)) {
    return { ...state, loadingFilter: false }
  }

  if (isType(action, appInstallationsSetFormState)) {
    return { ...state, formState: action.data }
  }

  return state
}

export default appInstallationsReducer
