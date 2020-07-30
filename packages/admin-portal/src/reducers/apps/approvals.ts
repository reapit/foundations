import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { approvalsLoading, approvalsReceiveData, approvalsRequestDataFailure } from '@/actions/approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type ApprovalList = PagedResultApprovalModel_ & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export type ApprovalsState = ApprovalList

export const defaultState: ApprovalsState = getDefaultFetchListValue()

// migrate to approvalListReducer
const approvalsReducer = (state: ApprovalsState = defaultState, action: Action<any>): ApprovalsState => {
  if (isType(action, approvalsLoading)) {
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

  if (isType(action, approvalsRequestDataFailure)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default approvalsReducer
