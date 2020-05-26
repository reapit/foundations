import { ReduxState } from '@/types/core'

export const selectAppDetailState = (state: ReduxState) => {
  return state.client || {}
}

export const selectAppDetailData = (state: ReduxState) => {
  return state.client.appDetail.data || {}
}

export const selectAppDetailAuthentication = (state: ReduxState) => {
  return state.appDetail.authentication
}

export const selectAppDetailLoading = (state: ReduxState) => {
  return state.client.appDetail.isAppDetailLoading
}
