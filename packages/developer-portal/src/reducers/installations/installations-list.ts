import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import {
  fetchInstallationsList,
  fetchInstallationsListSuccess,
  fetchInstallationsListFailed,
} from '@/actions/installations'

export interface InstallationsListState {
  isLoading: boolean
  list: PagedResultInstallationModel_ | null
}

export const defaultState: InstallationsListState = {
  isLoading: false,
  list: null,
}

const installationsListReducer = (
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

export default installationsListReducer
