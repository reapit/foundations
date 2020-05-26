import { ReduxState } from '@/types/core'
import { AdminApprovalsState } from '@/reducers/admin-approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'

export const selectAdminAppsState = (state: ReduxState) => {
  return state.adminApps
}

export const selectAdminAppsData = (state: ReduxState) => {
  return state.adminApps.adminAppsData
}

export const selectAdminApprovalsState = (state: ReduxState): AdminApprovalsState => {
  return state.adminApprovals
}

export const selectWaitingApprovalData = (state: ReduxState): PagedResultApprovalModel_ => {
  return state?.adminApprovals?.adminApprovalsData?.data || {}
}
