import { ReduxState } from '@/types/core'
import { AppRevisionModel } from '@reapit/foundations-ts-definitions'

export const selectAppRevisions = (state: ReduxState) => {
  return state?.revisions?.revisions || {}
}

export const selectAppRevisionDetail = (state: ReduxState) => {
  return state?.revisionDetail || {}
}

export const selectAppRevision = (state: ReduxState): AppRevisionModel => {
  return state?.revisionDetail?.revisionDetailData?.data || {}
}
