import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import {
  fetchInstallationsList,
  fetchInstallationsListSuccess,
  fetchInstallationsListFailed,
} from '@/actions/installations'

export interface InstallationsListState {
  loading: boolean
  pagedResult: PagedResultInstallationModel_ | null
}

export const defaultState: InstallationsListState = {
  loading: false,
  pagedResult: null,
}

const installationsListReducer = (
  state: InstallationsListState = defaultState,
  action: Action<any>,
): InstallationsListState => {
  if (isType(action, fetchInstallationsList)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, fetchInstallationsListSuccess)) {
    return {
      ...state,
      pagedResult: action.data,
      loading: false,
    }
  }
  if (isType(action, fetchInstallationsListFailed)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default installationsListReducer
