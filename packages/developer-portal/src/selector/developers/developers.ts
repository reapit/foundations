import { ReduxState } from '@/types/core'
import { MemberModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { InviteMemberStatus } from '@/reducers/developers/member-details'

export const selectOrganisationMembers = (state: ReduxState): MemberModel[] => {
  return state.developers?.members?.data || []
}

export const selectOrganisationMembersLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.isLoading
}

export const selectInviteDeveloperAsOrgMemberLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.inviteMember?.isLoading
}

export const selectDeveloperDetails = (state: ReduxState): DeveloperModel | null => {
  return state.developers?.developerDetails?.data
}

export const selectDeveloperDetailsLoading = (state: ReduxState): boolean => {
  return state.developers?.developerDetails?.isLoading
}

export const selectMemberDetails = (state: ReduxState): MemberModel | null => {
  return state.developers?.memberDetails?.data
}

export const selectMemberDetailsLoading = (state: ReduxState): boolean => {
  return state.developers?.memberDetails?.isLoading
}

export const selectInviteMemberStatus = (state: ReduxState): InviteMemberStatus => {
  return state.developers?.memberDetails?.inviteStatus
}

export const selectSetAsAdminLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.setAsAdmin?.isLoading
}

export const selectDisableMemberLoading = (state: ReduxState): boolean => {
  return state.developers?.members?.disableMember?.isLoading
}
