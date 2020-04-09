import { ReduxState } from '@/types/core'

export const getAppUsageStats = (state: ReduxState) => {
  return state.appUsageStats
}

export const getAppHttpTraffic = (state: ReduxState) => {
  return state.appHttpTraffic
}
