import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { appsReceiveData, appsRequestData, appsRequestFailure, appsSetFormState } from '../actions/apps-management'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'

export interface AppsManagementState {
  loading: boolean
  formState: FormState
  appsData: PagedResultAppSummaryModel_ | null
}

export const defaultState: AppsManagementState = {
  loading: false,
  formState: 'PENDING',
  appsData: null,
}

const appsManagementReducer = (state: AppsManagementState = defaultState, action: Action<any>): AppsManagementState => {
  if (isType(action, appsRequestData)) {
    return {
      ...state,
      loading: true,
    }
  }

  if (isType(action, appsReceiveData)) {
    return {
      ...state,
      loading: false,
      appsData: action.data || null,
    }
  }

  if (isType(action, appsRequestFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  if (isType(action, appsSetFormState)) {
    return {
      ...state,
      formState: action.data,
    }
  }

  return state
}

export default appsManagementReducer
