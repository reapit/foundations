import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  devsManagementLoading,
  devsManagementReceiveData,
  devsManagementRequestDataFailure,
} from '../actions/devs-management'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'

export interface DevsManagementState {
  loading: boolean
  data?: PagedResultDeveloperModel_
}

export const defaultState: DevsManagementState = {
  loading: false,
  data: undefined,
}

const devsManagementReducer = (state: DevsManagementState = defaultState, action: Action<any>): DevsManagementState => {
  if (isType(action, devsManagementLoading)) {
    return { ...state, loading: action.data }
  }

  if (isType(action, devsManagementReceiveData)) {
    return {
      ...state,
      loading: false,
      data: {
        ...action.data,
        data: action.data?.data ? action.data?.data : [],
      },
    }
  }

  if (isType(action, devsManagementRequestDataFailure)) {
    return { ...state, loading: false }
  }

  return state
}

export default devsManagementReducer
