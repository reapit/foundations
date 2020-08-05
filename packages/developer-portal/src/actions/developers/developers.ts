import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import {
  FetchDeveloperByIdParams,
  FetchMemberDetailsParams,
  AcceptInviteMemberParams,
  RejectInviteMemberParams,
  FetchOrganisationMembersParams,
  InviteDeveloperAsOrgMemberParams,
} from '@/services/developers'
import { PagedResultMemberModel_, DeveloperModel, MemberModel } from '@reapit/foundations-ts-definitions'
import { InviteMemberStatus } from '@/reducers/developers/member-details'

export const fetchOrganisationMembers = actionCreator<FetchOrganisationMembersParams>(
  ActionTypes.ORGANISATION_FETCH_MEMBERS,
)
export const fetchOrganisationMembersSuccess = actionCreator<PagedResultMemberModel_>(
  ActionTypes.ORGANISATION_FETCH_MEMBERS_SUCCESS,
)
export const fetchOrganisationMembersFailed = actionCreator<string>(ActionTypes.ORGANISATION_FETCH_MEMBERS_FAILED)
export const inviteDeveloperAsOrgMember = actionCreator<InviteDeveloperAsOrgMemberParams>(
  ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER,
)

export const inviteDeveloperAsOrgMemberSuccess = actionCreator<void>(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_SUCCESS)
export const inviteDeveloperAsOrgMemberFailed = actionCreator<void>(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED)

export const fetchDeveloperDetails = actionCreator<FetchDeveloperByIdParams>(ActionTypes.FETCH_DEVELOPER_DETAILS)
export const fetchDeveloperDetailsSuccess = actionCreator<DeveloperModel>(ActionTypes.FETCH_DEVELOPER_DETAILS_SUCCESS)
export const fetchDeveloperDetailsFailed = actionCreator<void>(ActionTypes.FETCH_DEVELOPER_DETAILS_FAILED)

export const fetchMemberDetails = actionCreator<FetchMemberDetailsParams>(ActionTypes.FETCH_MEMBER_DETAILS)
export const fetchMemberDetailsSuccess = actionCreator<MemberModel>(ActionTypes.FETCH_MEMBER_DETAILS_SUCCESS)
export const fetchMemberDetailsFailed = actionCreator<void>(ActionTypes.FETCH_MEMBER_DETAILS_FAILED)

export const acceptInviteMember = actionCreator<AcceptInviteMemberParams>(ActionTypes.ACCEPT_INVITE_MEMBER)
export const rejectInviteMember = actionCreator<RejectInviteMemberParams>(ActionTypes.REJECT_INVITE_MEMBER)
export const setInviteMemberStatus = actionCreator<InviteMemberStatus>(ActionTypes.SET_INVITE_MEMBER_STATUS)
