import { ReduxState } from '@/types/core'

export const selectAppDetailState = (state: ReduxState) => {
  return state?.appDetail
}

export const selectAppDetailId = (state: ReduxState) => {
  return state?.appDetail?.appDetailData?.data?.id
}

export const selectAppDetailInstallationId = (state: ReduxState) => {
  return state?.appDetail?.appDetailData?.data?.installationId
}
