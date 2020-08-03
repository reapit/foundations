import { ReduxState } from '@/types/core'

export const selectAppRevisions = (state: ReduxState) => {
  return state?.apps?.revisions?.list?.data || []
}

export const selectAppRevisionDetail = (state: ReduxState) => {
  return state?.apps?.revisions?.detail || {}
}

export const selectDeclineAppRevisionLoading = (state: ReduxState) => {
  return state?.apps?.revisions?.declineRevision?.isLoading
}
