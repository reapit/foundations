import appListReducer, { AppListState } from './list'
import appDetailReducer, { AppDetailState } from './detail'
import { combineReducers } from 'redux'

export type AppsState = {
  detail: AppDetailState
  list: AppListState
}

// write route section for combine reducer

export default combineReducers({
  detail: appDetailReducer,
  list: appListReducer,
})
