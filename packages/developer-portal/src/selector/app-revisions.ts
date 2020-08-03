import { ReduxState } from '@/types/core'
import { AppRevisionModel } from '@reapit/foundations-ts-definitions'

export const selectAppRevisions = (state: ReduxState) => {
  return state?.apps?.revisions?.list?.data || []
}

export const selectAppRevisionDetail = (state: ReduxState) => {
  return state?.apps?.revisions?.detail || {}
}

export const selectAppRevision = (state: ReduxState): AppRevisionModel => {
  return state?.revisionDetail?.revisionDetailData?.data || {}
}

export const selectDeclineAppRevisionLoading = (state: ReduxState) => {
  return state?.apps?.revisions?.declineRevision?.isLoading
}
