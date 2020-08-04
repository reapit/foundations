import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchApprovalList, fetchApprovalListSuccess, fetchApprovalListFailed } from '@/actions/approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'
import { getDefaultFetchListValue, FetchListResult } from '@reapit/utils'

export type ApprovalList = FetchListResult<PagedResultApprovalModel_>

export type ApprovalsState = ApprovalList

export const defaultState: ApprovalsState = getDefaultFetchListValue()

// migrate to approvalListReducer
const approvalsReducer = (state: ApprovalsState = defaultState, action: Action<any>): ApprovalsState => {
  if (isType(action, fetchApprovalList)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchApprovalListSuccess)) {
    return {
      ...state,
      isLoading: false,
      ...(action.data || {}),
    }
  }

  if (isType(action, fetchApprovalListFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default approvalsReducer
