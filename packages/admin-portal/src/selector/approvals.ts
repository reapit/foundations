import { ReduxState } from '@/types/core'

export const selectApprovalListPageNumber = (state: ReduxState) => {
  return {
    pageNumber: state?.approvals?.list?.pageNumber || 1,
  }
}
