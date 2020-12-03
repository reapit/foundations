import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  fetchInstallationsList,
  fetchInstallationsListSuccess,
  fetchInstallationsListFailed,
} from '@/actions/installations'

export interface InstallationsListState {
  isLoading: boolean
  list: InstallationModelPagedResult | null
}

export const defaultState: InstallationsListState = {
  isLoading: false,
  list: null,
}

export const installationsListReducer = (
  state: InstallationsListState = defaultState,
  action: Action<any>,
): InstallationsListState => {
  if (isType(action, fetchInstallationsList)) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (isType(action, fetchInstallationsListSuccess)) {
    return {
      ...state,
      list: action.data,
      isLoading: false,
    }
  }
  if (isType(action, fetchInstallationsListFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}
