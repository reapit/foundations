import { ReduxState } from '@/types/core'
import { AdminApprovalsState } from '@/reducers/admin-approvals'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'
import { AdminDevManamgenetState } from '@/reducers/admin-dev-management'
import { AdminAppsState } from '@/reducers/admin-apps'

export const selectAdminAppsState = (state: ReduxState): AdminAppsState => {
  return state?.adminApps || {}
}

export const selectAdminAppsLoading = (state: ReduxState): boolean => {
  return !!state?.adminApps?.loading
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

export const selectAdminDevManagement = (state: ReduxState): AdminDevManamgenetState => {
  return state.adminDevManagement
}
