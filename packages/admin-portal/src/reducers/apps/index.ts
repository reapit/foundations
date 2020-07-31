import appListReducer, { AppListState, defaultState as defaultAppListState } from './list'
import appDetailReducer, { AppDetailState, defaultState as defaultAppDetailState } from './detail'
import approvalsReducer, { ApprovalsState, defaultState as defaultApprovalsState } from './approvals'
import revisionReducer, { RevisionDetailState, defaultState as defaultRevisionState } from './revisions'
import statisticsReducer, { StatisticsState, defaultState as defaultStaticsState } from './statistics'
import deleteFormStateReducer from './delete-form-state'
import { combineReducers } from 'redux'
import { FormState } from '@/types/core'

export type AppsState = {
  detail: AppDetailState
  list: AppListState
  approvals: ApprovalsState
  revision: RevisionDetailState
  statistics: StatisticsState
  deleteFormState: FormState
}

export const defaultState: AppsState = {
  list: defaultAppListState,
  detail: defaultAppDetailState,
  approvals: defaultApprovalsState,
  revision: defaultRevisionState,
  statistics: defaultStaticsState,
  deleteFormState: 'PENDING',
}

export default combineReducers<AppsState>({
  detail: appDetailReducer,
  list: appListReducer,
  approvals: approvalsReducer,
  revision: revisionReducer,
  statistics: statisticsReducer,
  deleteFormState: deleteFormStateReducer,
})
