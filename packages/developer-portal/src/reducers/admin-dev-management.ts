import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  adminDevManagementLoading,
  adminDevManagementReceiveData,
  adminDevManagementRequestDataFailure,
} from '../actions/admin-dev-management'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'

export interface AdminDevManamgenetState {
  loading: boolean
  data?: PagedResultDeveloperModel_
}

export const defaultState: AdminDevManamgenetState = {
  loading: false,
  data: undefined,
}

const adminDevManagementReducer = (
  state: AdminDevManamgenetState = defaultState,
  action: Action<any>,
): AdminDevManamgenetState => {
  if (isType(action, adminDevManagementLoading)) {
    return { ...state, loading: action.data }
  }

  if (isType(action, adminDevManagementReceiveData)) {
    return {
      ...state,
      loading: false,
      data: {
        ...action.data,
        data: action.data?.data ? action.data?.data : [],
      },
    }
  }

  if (isType(action, adminDevManagementRequestDataFailure)) {
    return { ...state, loading: false }
  }

  return state
}

export default adminDevManagementReducer
