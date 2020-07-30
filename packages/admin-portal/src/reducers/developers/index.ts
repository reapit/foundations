import developerListReducer, { DeveloperListState, defaultState as developerListState } from './list'
import { combineReducers } from 'redux'

export const defaultState = {
  list: developerListState,
}

export type DevelopersState = {
  list: DeveloperListState
}

export default combineReducers({
  list: developerListReducer,
})
