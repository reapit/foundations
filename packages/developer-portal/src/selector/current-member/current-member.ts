import { ReduxState } from '@/types/core'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { CurrentMemberUpdateState } from '../../reducers/current-member'

export const selectCurrentMemberData = (state: ReduxState): MemberModel => {
  return state.currentMember.data
}

export const selectCurrentMemberIsLoading = (state: ReduxState): boolean => {
  return state.currentMember.isLoading
}

export const selectCurrentMemberUpdateState = (state: ReduxState): CurrentMemberUpdateState => {
  return state.currentMember.update.state
}

export const selectCurrentMemberIsUpdating = (state: ReduxState): boolean => {
  return state.currentMember.update.isLoading
}
