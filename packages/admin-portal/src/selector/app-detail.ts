import { ReduxState } from '@/types/core'
import { AppsState } from '@/reducers/apps'

export const selectAppDetailState = (state: ReduxState): AppsState['detail'] => {
  return state?.apps?.detail || {}
}

export const selectAppDetailData = (state: ReduxState): AppsState['detail']['data'] => {
  return state?.apps?.detail?.data || {}
}
