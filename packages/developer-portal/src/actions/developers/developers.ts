import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'
import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchOrganisationMembersParams, InviteDeveloperAsOrgMemberParams } from '@/services/developers'

export const fetchOrganisationMembers = actionCreator<FetchOrganisationMembersParams>(
  ActionTypes.ORGANISATION_FETCH_MEMBERS,
)
export const fetchOrganisationMembersSuccess = actionCreator<PagedResultMemberModel_>(
  ActionTypes.ORGANISATION_FETCH_MEMBERS_SUCCESS,
)
export const fetchOrganisationMembersFailed = actionCreator<void>(ActionTypes.ORGANISATION_FETCH_MEMBERS_FAILED)
export const inviteDeveloperAsOrgMember = actionCreator<InviteDeveloperAsOrgMemberParams>(
  ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER,
)

export const inviteDeveloperAsOrgMemberSuccess = actionCreator<void>(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_SUCCESS)
export const inviteDeveloperAsOrgMemberFailed = actionCreator<void>(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED)
