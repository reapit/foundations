import appListReducer, { AppListState, defaultState as defaultAppListState } from './list'
import appDetailReducer, { AppDetailState, defaultState as defaultAppDetailState } from './detail'
import { combineReducers } from 'redux'

export type AppsState = {
  detail: AppDetailState
  list: AppListState
}

export const defaultState: AppsState = {
  list: defaultAppListState,
  detail: defaultAppDetailState,
}

export default combineReducers({
  detail: appDetailReducer,
  list: appListReducer,
})
