import { combineReducers } from 'redux'
import membersReducer, { MembersState } from './members'

export interface DevelopersRootState {
  members: MembersState
}

export default combineReducers<DevelopersRootState>({
  members: membersReducer,
})
