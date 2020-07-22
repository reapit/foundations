import { ReduxState } from '@/types/core'
import { MemberModel } from '@reapit/foundations-ts-definitions'

export const selectOrganisationMembers = (state: ReduxState): MemberModel[] => {
  return state.developers?.members?.pagedResult?.data || []
}

export const selectOrganisationMembersLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.loading
}

export const selectInviteDeveloperAsOrgMemberLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.inviteMember?.loading
}
