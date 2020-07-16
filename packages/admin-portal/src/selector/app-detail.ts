import { ReduxState } from '@/types/core'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

export const selectAppDetailState = (state: ReduxState) => {
  return state?.appDetail
}

export const selectAppDetailId = (state: ReduxState) => {
  return state?.appDetail?.appDetailData?.data?.id
}

export const selectAppDetailInstallationId = (state: ReduxState) => {
  return state?.appDetail?.appDetailData?.data?.installationId
}

export const selectApp = (state: ReduxState): AppDetailModel => {
  return state?.appDetail?.appDetailData?.data || {}
}
