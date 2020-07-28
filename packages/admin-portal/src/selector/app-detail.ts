import { ReduxState } from '@/types/core'
import { AppDetailState, AppDetailItem } from '@/reducers/apps/detail'

export const selectAppDetailState = (state: ReduxState): AppDetailState => {
  return state?.apps?.detail || {}
}

export const selectAppDetailData = (state: ReduxState): AppDetailItem => {
  return state?.apps?.detail?.data || {}
}
