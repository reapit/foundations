import { ReduxState } from '@/types/core'

export const selectAdminAppsState = (state: ReduxState) => {
  return state.adminApps
}

export const selectAdminAppsData = (state: ReduxState) => {
  return state.adminApps.adminAppsData
}
