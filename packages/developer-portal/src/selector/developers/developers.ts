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

export const selectDeveloperDetails = (state: ReduxState) => {
  return state.developers?.developerDetails?.data
}

export const selectDeveloperDetailsLoading = (state: ReduxState) => {
  return state.developers?.developerDetails?.loading
}

export const selectMemberDetails = (state: ReduxState) => {
  return state.developers?.memberDetails?.data
}

export const selectMemberDetailsLoading = (state: ReduxState) => {
  return state.developers?.memberDetails?.loading
}

export const selectInviteMemberStatus = (state: ReduxState) => {
  return state.developers?.memberDetails?.inviteStatus
}
