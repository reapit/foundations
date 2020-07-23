import { combineReducers } from 'redux'
import membersReducer, { MembersState } from './members'
import developerDetailsReducer, { DeveloperDetailsState } from './developer-details'
import memberDetailsReducer, { MemberDetailsState } from './member-details'

export type DevelopersRootState = {
  members: MembersState
  developerDetails: DeveloperDetailsState
  memberDetails: MemberDetailsState
}
export default combineReducers<DevelopersRootState>({
  members: membersReducer,
  developerDetails: developerDetailsReducer,
  memberDetails: memberDetailsReducer,
})
