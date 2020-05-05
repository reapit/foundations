import { ReduxState } from '@/types/core'

export const selectAppDetailState = (state: ReduxState) => {
  return state.appDetail || {}
}

export const selectAppDetailData = (state: ReduxState) => {
  return state.appDetail.appDetailData?.data || {}
}

export const selectAppDetailAuthentication = (state: ReduxState) => {
  return state.appDetail.authentication
}

export const selectAppDetailLoading = (state: ReduxState) => {
  return state.appDetail.loading
}
