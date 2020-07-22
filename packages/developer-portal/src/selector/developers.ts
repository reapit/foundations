import { ReduxState } from '@/types/core'

export const selectOrganisationMembers = (state: ReduxState) => {
  return state.developers?.members?.pagedResult?.data || []
}

export const selectOrganisationMembersLoading = (state: ReduxState) => {
  return state.developers?.members?.loading
}
