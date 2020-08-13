import { ReduxState } from '@/types/core'

export const selectCurrentMemberData = (state: ReduxState) => {
  return state.currentMember.data
}

export const selectCurrentMemberIsLoading = (state: ReduxState) => {
  return state.currentMember.isLoading
}

export const selectCurrentMemberIsUpdating = (state: ReduxState) => {
  return state.currentMember.update.isLoading
}
