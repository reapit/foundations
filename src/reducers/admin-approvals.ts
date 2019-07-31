import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  adminApprovalsLoading,
  adminApprovalsReceiveData,
  adminApprovalsClearData,
  adminApprovalsRequestDataFailure
} from '../actions/admin-approvals'
import { PagedResultApprovalModel_ } from '../types/marketplace-api-schema'

export interface AdminApprovalsList {
  data: PagedResultApprovalModel_
}

export interface AdminApprovalsState {
  loading: boolean
  adminApprovalsData: AdminApprovalsList | null
}

export const defaultState: AdminApprovalsState = {
  loading: false,
  adminApprovalsData: null
}

const adminApprovalsReducer = (state: AdminApprovalsState = defaultState, action: Action<any>): AdminApprovalsState => {
  if (isType(action, adminApprovalsLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, adminApprovalsReceiveData)) {
    return {
      ...state,
      loading: false,
      adminApprovalsData: action.data || null
    }
  }

  if (isType(action, adminApprovalsClearData)) {
    return {
      ...state,
      loading: false,
      adminApprovalsData: action.data
    }
  }

  if (isType(action, adminApprovalsRequestDataFailure)) {
    return {
      ...state,
      loading: false
    }
  }

  return state
}

export default adminApprovalsReducer
