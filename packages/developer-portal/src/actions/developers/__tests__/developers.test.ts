import ActionTypes from '@/constants/action-types'
import {
  inviteDeveloperAsOrgMember,
  inviteDeveloperAsOrgMemberFailed,
  inviteDeveloperAsOrgMemberSuccess,
  fetchOrganisationMembers,
  fetchOrganisationMembersSuccess,
  fetchOrganisationMembersFailed,
  fetchDeveloperDetails,
  fetchDeveloperDetailsSuccess,
  fetchDeveloperDetailsFailed,
  fetchMemberDetails,
  fetchMemberDetailsSuccess,
  fetchMemberDetailsFailed,
  acceptInviteMember,
  rejectInviteMember,
  setInviteMemberStatus,
  disableMember,
  disableMemberSuccess,
  disableMemberFailed,
} from '../developers'
import { FetchOrganisationMembersParams } from '@/services/developers'
import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'

describe('developers', () => {
  describe('inviteDeveloperAsOrgMember', () => {
    it('should create a inviteDeveloperAsOrgMember action', () => {
      expect(inviteDeveloperAsOrgMember.type).toEqual(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER)
    })
  })
  describe('inviteDeveloperAsOrgMemberFailed', () => {
    it('should create a inviteDeveloperAsOrgMemberFailed action', () => {
      expect(inviteDeveloperAsOrgMemberFailed.type).toEqual(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED)
    })
  })
  describe('inviteDeveloperAsOrgMemberSuccess', () => {
    it('should ', () => {
      expect(inviteDeveloperAsOrgMemberSuccess.type).toEqual(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_SUCCESS)
    })
  })
})

describe('member action', () => {
  it('should create a fetchOrganisationMembers action', () => {
    const params: FetchOrganisationMembersParams = {
      id: '123',
    }
    expect(fetchOrganisationMembers.type).toEqual(ActionTypes.ORGANISATION_FETCH_MEMBERS)
    expect(fetchOrganisationMembers(params).data).toEqual(params)
  })

  it('should create a fetchOrganisationMembersSuccess action', () => {
    const params: PagedResultMemberModel_ = {
      data: [],
      pageCount: 1,
      pageNumber: 20,
      pageSize: 20,
    }
    expect(fetchOrganisationMembersSuccess.type).toEqual(ActionTypes.ORGANISATION_FETCH_MEMBERS_SUCCESS)
    expect(fetchOrganisationMembersSuccess(params).data).toEqual(params)
  })

  it('should create a fetchOrganisationMembersFailed action', () => {
    expect(fetchOrganisationMembersFailed.type).toEqual(ActionTypes.ORGANISATION_FETCH_MEMBERS_FAILED)
  })

  it('should create a fetchDeveloperDetails action', () => {
    expect(fetchDeveloperDetails.type).toEqual(ActionTypes.FETCH_DEVELOPER_DETAILS)
  })

  it('should create a fetchDeveloperDetailsSuccess action', () => {
    expect(fetchDeveloperDetailsSuccess.type).toEqual(ActionTypes.FETCH_DEVELOPER_DETAILS_SUCCESS)
  })

  it('should create a fetchDeveloperDetailsFailed action', () => {
    expect(fetchDeveloperDetailsFailed.type).toEqual(ActionTypes.FETCH_DEVELOPER_DETAILS_FAILED)
  })

  it('should create a fetchMemberDetails action', () => {
    expect(fetchMemberDetails.type).toEqual(ActionTypes.FETCH_MEMBER_DETAILS)
  })

  it('should create a fetchMemberDetailsSuccess action', () => {
    expect(fetchMemberDetailsSuccess.type).toEqual(ActionTypes.FETCH_MEMBER_DETAILS_SUCCESS)
  })
  it('should create a fetchMemberDetailsFailed action', () => {
    expect(fetchMemberDetailsFailed.type).toEqual(ActionTypes.FETCH_MEMBER_DETAILS_FAILED)
  })
  it('should create a acceptInviteMember action', () => {
    expect(acceptInviteMember.type).toEqual(ActionTypes.ACCEPT_INVITE_MEMBER)
  })
  it('should create a rejectInviteMember action', () => {
    expect(rejectInviteMember.type).toEqual(ActionTypes.REJECT_INVITE_MEMBER)
  })
  it('should create a setInviteMemberStatus action', () => {
    expect(setInviteMemberStatus.type).toEqual(ActionTypes.SET_INVITE_MEMBER_STATUS)
  })
  it('should create a fetchMemberDetails action', () => {
    expect(fetchMemberDetails.type).toEqual(ActionTypes.FETCH_MEMBER_DETAILS)
  })

  it('should create a disableMember action', () => {
    expect(disableMember.type).toEqual(ActionTypes.DISABLE_MEMBER)
  })
  it('should create a disableMemberSuccess action', () => {
    expect(disableMemberSuccess.type).toEqual(ActionTypes.DISABLE_MEMBER_SUCCESS)
  })
  it('should create a disableMemberFailed action', () => {
    expect(disableMemberFailed.type).toEqual(ActionTypes.DISABLE_MEMBER_FAILED)
  })
})
