import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import {
  adminAppsReceiveData,
  adminAppsRequestData,
  adminAppsRequestFailure,
  adminAppsSetFormState,
} from '../actions/admin-apps'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'

export interface AdminAppsState {
  loading: boolean
  formState: FormState
  adminAppsData: PagedResultAppSummaryModel_ | null
}

export const defaultState: AdminAppsState = {
  loading: false,
  formState: 'PENDING',
  adminAppsData: null,
}

const adminAppsReducer = (state: AdminAppsState = defaultState, action: Action<any>): AdminAppsState => {
  if (isType(action, adminAppsRequestData)) {
    return {
      ...state,
      loading: true,
    }
  }

  if (isType(action, adminAppsReceiveData)) {
    return {
      ...state,
      loading: false,
      adminAppsData: action.data || null,
    }
  }

  if (isType(action, adminAppsRequestFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  if (isType(action, adminAppsSetFormState)) {
    return {
      ...state,
      formState: action.data,
    }
  }

  return state
}

export default adminAppsReducer
