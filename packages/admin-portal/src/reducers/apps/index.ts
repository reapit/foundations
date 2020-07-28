import appDetailReducer, { AppDetailState } from './detail'
import { combineReducers } from 'redux'

export type AppsState = {
  detail: AppDetailState
}

export default combineReducers({
  detail: appDetailReducer,
})
