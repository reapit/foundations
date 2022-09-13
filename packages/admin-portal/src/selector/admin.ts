import { ReduxState } from '@/types/core'
import { ApprovalList } from '@/reducers/apps/approvals'
import { DeveloperListState } from '@/reducers/developers/list'
import { SubscriptionListState } from '@/reducers/subscriptions/list'

export const selectApprovals = (state: ReduxState): ApprovalList => {
  return state.apps?.approvals
}
export const selectDeveloperListState = (state: ReduxState): DeveloperListState => {
  return state.developers.list
}

export const selectSubscriptionListState = (state: ReduxState): SubscriptionListState => {
  return state.subscriptions.list
}
