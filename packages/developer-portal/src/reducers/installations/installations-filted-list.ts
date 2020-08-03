import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import {
  fetchInstallationsFilterList,
  fetchInstallationsFilterListSuccess,
  fetchInstallationsFilterListFailed,
} from '@/actions/installations'

export interface InstallationsFilterListState {
  loading: boolean
  pagedResult: PagedResultInstallationModel_ | null
}

export const defaultState: InstallationsFilterListState = {
  loading: false,
  pagedResult: null,
}

const installationsFilterListReducer = (
  state: InstallationsFilterListState = defaultState,
  action: Action<any>,
): InstallationsFilterListState => {
  if (isType(action, fetchInstallationsFilterList)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, fetchInstallationsFilterListSuccess)) {
    return {
      ...state,
      pagedResult: action.data,
      loading: false,
    }
  }
  if (isType(action, fetchInstallationsFilterListFailed)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default installationsFilterListReducer
