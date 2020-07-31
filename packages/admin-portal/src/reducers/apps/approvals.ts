import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchApprovalsData, approvalsReceiveData, fetchApprovalsDataFailed } from '@/actions/approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'
import { getDefaultFetchListValue, FetchListResult } from '@reapit/utils'

export type ApprovalList = FetchListResult<PagedResultApprovalModel_>

export type ApprovalsState = ApprovalList

export const defaultState: ApprovalsState = getDefaultFetchListValue()

// migrate to approvalListReducer
const approvalsReducer = (state: ApprovalsState = defaultState, action: Action<any>): ApprovalsState => {
  if (isType(action, fetchApprovalsData)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, approvalsReceiveData)) {
    return {
      ...state,
      isLoading: false,
      ...(action.data || {}),
    }
  }

  if (isType(action, fetchApprovalsDataFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default approvalsReducer
