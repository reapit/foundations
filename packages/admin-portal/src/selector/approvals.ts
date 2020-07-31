import { ReduxState } from '@/types/core'

export const selectApprovalListPageNumber = (state: ReduxState) => {
  return {
    pageNumber: state?.apps?.approvals?.pageNumber || 1,
  }
}
