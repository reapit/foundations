import { combineReducers } from 'redux'
import { negotiatorsReducer, NegotiatorsState } from './list'

export type NegotiatorsRootState = {
  list: NegotiatorsState
}

export default combineReducers<NegotiatorsRootState>({
  list: negotiatorsReducer,
})
