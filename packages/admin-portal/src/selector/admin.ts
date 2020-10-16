import { ReduxState } from '@/types/core'
import { ApprovalList } from '@/reducers/apps/approvals'
import { DeveloperListState } from '@/reducers/developers/list'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { StatisticsState } from '@/reducers/apps/statistics'

export const selectAppsLoading = (state: ReduxState): boolean => {
  return !!state?.apps.list?.isLoading
}

export const selectAppsData = (state: ReduxState): AppSummaryModelPagedResult | null => {
  return state.apps.list || {}
}

export const selectApprovals = (state: ReduxState): ApprovalList => {
  return state.apps?.approvals
}

export const selectStatistics = (state: ReduxState): StatisticsState => {
  return state.apps?.statistics || {}
}

export const selectDeveloperListState = (state: ReduxState): DeveloperListState => {
  return state.developers.list
}
