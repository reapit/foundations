import { combineReducers } from 'redux'
import { webComponentReducer, WebComponentState } from './detail'
import { webComponentUpdateReducer, WebComponentUpdateState } from './update'

export interface WebComponentRootState {
  detail: WebComponentState
  update: WebComponentUpdateState
}

export default combineReducers<WebComponentRootState>({
  detail: webComponentReducer,
  update: webComponentUpdateReducer,
})
