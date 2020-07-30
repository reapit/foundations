import developerListReducer, { DeveloperListState, defaultState as developerListState } from './list'
import setStatusFormStateReducer from './set-status-form-state'
import { combineReducers } from 'redux'
import { FormState } from '@/types/core'

export const defaultState: DevelopersState = {
  list: developerListState,
  setStatusFormState: 'PENDING',
}

export type DevelopersState = {
  list: DeveloperListState
  setStatusFormState: FormState
}

export default combineReducers<DevelopersState>({
  list: developerListReducer,
  setStatusFormState: setStatusFormStateReducer,
})
