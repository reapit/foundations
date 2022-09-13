import appDetailReducer, { AppDetailState, defaultState as defaultAppDetailState } from './detail'
import approvalsReducer, { ApprovalsState, defaultState as defaultApprovalsState } from './approvals'
import revisionReducer, { RevisionDetailState, defaultState as defaultRevisionState } from './revisions'
import { combineReducers } from 'redux'

export type AppsState = {
  detail: AppDetailState
  approvals: ApprovalsState
  revision: RevisionDetailState
}

export const defaultState: AppsState = {
  detail: defaultAppDetailState,
  approvals: defaultApprovalsState,
  revision: defaultRevisionState,
}

export default combineReducers<AppsState>({
  detail: appDetailReducer,
  approvals: approvalsReducer,
  revision: revisionReducer,
})
