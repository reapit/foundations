import { ReduxState } from '@/types/core'

export const selectAppDetailState = (state: ReduxState) => {
  return state.developer.developerAppDetail || {}
}

export const selectAppDetailData = (state: ReduxState) => {
  return state.developer.developerAppDetail.data || {}
}

export const selectAppDetailAuthentication = (state: ReduxState) => {
  return state.appDetail.authentication
}

export const selectAppDetailLoading = (state: ReduxState) => {
  return state.developer.developerAppDetail.isAppDetailLoading
}
