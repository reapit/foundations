import { combineReducers } from 'redux'
import scopeListReducer, { ScopeListState } from './scope-list'

export type ScopesRootState = {
  list: ScopeListState
}
export default combineReducers<ScopesRootState>({
  list: scopeListReducer,
})
