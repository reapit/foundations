import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  approvalsLoading,
  approvalsReceiveData,
  approvalsClearData,
  approvalsRequestDataFailure,
} from '../actions/approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'

export interface ApprovalsList {
  data: PagedResultApprovalModel_
}

export interface ApprovalsState {
  loading: boolean
  approvalsData: ApprovalsList | null
}

export const defaultState: ApprovalsState = {
  loading: false,
  approvalsData: null,
}

const approvalsReducer = (state: ApprovalsState = defaultState, action: Action<any>): ApprovalsState => {
  if (isType(action, approvalsLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, approvalsReceiveData)) {
    return {
      ...state,
      loading: false,
      approvalsData: action.data || null,
    }
  }

  if (isType(action, approvalsClearData)) {
    return {
      ...state,
      loading: false,
      approvalsData: action.data,
    }
  }

  if (isType(action, approvalsRequestDataFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default approvalsReducer
