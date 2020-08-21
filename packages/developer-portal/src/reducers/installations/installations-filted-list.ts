import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import {
  fetchInstallationsFilterList,
  fetchInstallationsFilterListSuccess,
  fetchInstallationsFilterListFailed,
} from '@/actions/installations'

export interface InstallationsFilterListState {
  isLoading: boolean
  list: PagedResultInstallationModel_ | null
}

export const defaultState: InstallationsFilterListState = {
  isLoading: false,
  list: null,
}

const installationsFilterListReducer = (
  state: InstallationsFilterListState = defaultState,
  action: Action<any>,
): InstallationsFilterListState => {
  if (isType(action, fetchInstallationsFilterList)) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (isType(action, fetchInstallationsFilterListSuccess)) {
    return {
      ...state,
      list: action.data,
      isLoading: false,
    }
  }
  if (isType(action, fetchInstallationsFilterListFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default installationsFilterListReducer
