import { ReduxState } from '@/types/core'
import { ApprovalList } from '@/reducers/approvals'
import { DeveloperListState } from '@/reducers/developers/list'
import { PagedResultAppSummaryModel_ } from '@/types/marketplace-api-schema'
import { StatisticsState } from '@/reducers/statistics'

export const selectAppsLoading = (state: ReduxState): boolean => {
  return !!state?.apps.list?.isLoading
}

export const selectAppsData = (state: ReduxState): PagedResultAppSummaryModel_ | null => {
  return state.apps.list || {}
}

export const selectApprovalListState = (state: ReduxState): ApprovalList => {
  return state?.approvals?.list
}

export const selectStatistics = (state: ReduxState): StatisticsState => {
  return state.statistics
}

export const selectDeveloperListState = (state: ReduxState): DeveloperListState => {
  return state.developers.list
}
