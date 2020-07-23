import { ReduxState } from '@/types/core'
import { MemberModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { InviteMemberStatus } from '@/reducers/developers/member-details'

export const selectOrganisationMembers = (state: ReduxState): MemberModel[] => {
  return state.developers?.members?.pagedResult?.data || []
}

export const selectOrganisationMembersLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.loading
}

export const selectInviteDeveloperAsOrgMemberLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.inviteMember?.loading
}

export const selectDeveloperDetails = (state: ReduxState): DeveloperModel | null => {
  return state.developers?.developerDetails?.data
}

export const selectDeveloperDetailsLoading = (state: ReduxState): boolean => {
  return state.developers?.developerDetails?.loading
}

export const selectMemberDetails = (state: ReduxState): MemberModel | null => {
  return state.developers?.memberDetails?.data
}

export const selectMemberDetailsLoading = (state: ReduxState): boolean => {
  return state.developers?.memberDetails?.loading
}

export const selectInviteMemberStatus = (state: ReduxState): InviteMemberStatus => {
  return state.developers?.memberDetails?.inviteStatus
}
