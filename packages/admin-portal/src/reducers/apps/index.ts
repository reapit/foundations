import appListReducer, { AppListState, defaultState as defaultAppListState } from './list'
import appDetailReducer, { AppDetailState, defaultState as defaultAppDetailState } from './detail'
import approvalsReducer, { ApprovalsState, defaultState as defaultApprovalsState } from './approvals'
import revisionReducer, { RevisionDetailState, defaultState as defaultRevisionState } from './revisions'
import statisticsReducer, { StatisticsState, defaultState as defaultStaticsState } from './statistics'
import { combineReducers } from 'redux'

export type AppsState = {
  detail: AppDetailState
  list: AppListState
  approvals: ApprovalsState
  revision: RevisionDetailState
  statistics: StatisticsState
}

export const defaultState: AppsState = {
  list: defaultAppListState,
  detail: defaultAppDetailState,
  approvals: defaultApprovalsState,
  revision: defaultRevisionState,
  statistics: defaultStaticsState,
}

export default combineReducers<AppsState>({
  detail: appDetailReducer,
  list: appListReducer,
  approvals: approvalsReducer,
  revision: revisionReducer,
  statistics: statisticsReducer,
})
