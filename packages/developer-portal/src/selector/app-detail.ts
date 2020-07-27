import { ReduxState } from '@/types/core'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

export const selectAppDetailState = (state: ReduxState) => {
  return state?.apps.detail
}

export const selectAppDetailId = (state: ReduxState) => {
  return state.apps?.detail?.data?.id
}

export const selectAppDetailInstallationId = (state: ReduxState) => {
  return state.apps?.detail?.data?.installationId
}

export const selectAppDetailData = (state: ReduxState): AppDetailModel => {
  return state.apps?.detail?.data || {}
}

export const selectAppDetailLoading = (state: ReduxState): boolean => {
  return state.apps?.detail?.isLoading
}
