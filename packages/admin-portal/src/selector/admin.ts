import { ReduxState } from '@/types/core'
import { ApprovalsState } from '@/reducers/approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'
import { DevsManagementState } from '@/reducers/devs-management'
import { AppsManagementState } from '@/reducers/apps-management'
import { PagedResultAppSummaryModel_ } from '@/types/marketplace-api-schema'
import { StatisticsState } from '@/reducers/statistics'

export const selectAppsManagementState = (state: ReduxState): AppsManagementState => {
  return state?.appsManagement || {}
}

export const selectAppsLoading = (state: ReduxState): boolean => {
  return !!state?.appsManagement?.loading
}

export const selectAppsData = (state: ReduxState): PagedResultAppSummaryModel_ | null => {
  return state.appsManagement.appsData
}

export const selectApprovalsState = (state: ReduxState): ApprovalsState => {
  return state.approvals
}

export const selectWaitingApprovalData = (state: ReduxState): PagedResultApprovalModel_ => {
  return state?.approvals?.approvalsData?.data || {}
}

export const selectStatistics = (state: ReduxState): StatisticsState => {
  return state.statistics
}

export const selectDevsManagement = (state: ReduxState): DevsManagementState => {
  return state.devsManagement
}
