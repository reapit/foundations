import appListReducer, { AppListState, defaultState as defaultAppListState } from './list'
import appDetailReducer, { AppDetailState, defaultState as defaultAppDetailState } from './detail'
import approvalsReducer, { ApprovalsState, defaultState as defaultApprovalsState } from './approvals'
import revisionReducer, { RevisionDetailState, defaultState as defaultRevisionState } from './revisions'
import { combineReducers } from 'redux'

export type AppsState = {
  detail: AppDetailState
  list: AppListState
  approvals: ApprovalsState
  revision: RevisionDetailState
}

export const defaultState: AppsState = {
  list: defaultAppListState,
  detail: defaultAppDetailState,
  approvals: defaultApprovalsState,
  revision: defaultRevisionState,
}

export default combineReducers({
  detail: appDetailReducer,
  list: appListReducer,
  approvals: approvalsReducer,
  revision: revisionReducer,
})
