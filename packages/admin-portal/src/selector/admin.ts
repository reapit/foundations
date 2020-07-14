import { ReduxState } from '@/types/core'
import { ApprovalsState } from '@/reducers/approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'
import { AdminDevManamgenetState } from '@/reducers/admin-dev-management'
import { AdminAppsState } from '@/reducers/admin-apps'
import { PagedResultAppSummaryModel_ } from '@/types/marketplace-api-schema'
import { AdminStatsState } from '@/reducers/admin-stats'

export const selectAdminAppsState = (state: ReduxState): AdminAppsState => {
  return state?.adminApps || {}
}

export const selectAdminAppsLoading = (state: ReduxState): boolean => {
  return !!state?.adminApps?.loading
}

export const selectAdminAppsData = (state: ReduxState): PagedResultAppSummaryModel_ | null => {
  return state.adminApps.adminAppsData
}

export const selectApprovalsState = (state: ReduxState): ApprovalsState => {
  return state.approvals
}

export const selectWaitingApprovalData = (state: ReduxState): PagedResultApprovalModel_ => {
  return state?.approvals?.approvalsData?.data || {}
}

export const selectAdminStats = (state: ReduxState): AdminStatsState => {
  return state.adminStats
}

export const selectAdminDevManagement = (state: ReduxState): AdminDevManamgenetState => {
  return state.adminDevManagement
}
