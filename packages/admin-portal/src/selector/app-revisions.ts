import { ReduxState } from '@/types/core'
import { AppRevisionModel } from '@reapit/foundations-ts-definitions'

export const selectAppRevisionDetail = (state: ReduxState) => {
  return state?.revisionDetail || {}
}

export const selectAppRevision = (state: ReduxState): AppRevisionModel => {
  return state?.revisionDetail?.revisionDetailData?.data || {}
}
