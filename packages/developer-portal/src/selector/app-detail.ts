import { ReduxState } from '@/types/core'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

export const selectAppDetailState = (state: ReduxState) => {
  return state?.appDetail
}

export const selectAppDetailId = (state: ReduxState) => {
  return state?.appDetail?.data?.id
}

export const selectAppDetailInstallationId = (state: ReduxState) => {
  return state?.appDetail?.data?.installationId
}

export const selectAppDetailData = (state: ReduxState): AppDetailModel => {
  return state?.appDetail?.data || {}
}

export const selectAppDetailLoading = (state: ReduxState): boolean => {
  return state?.appDetail?.isLoading
}
