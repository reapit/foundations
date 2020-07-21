import {
  fetchOrganisationMembers,
  fetchOrganisationMembersSuccess,
  fetchOrganisationMembersFailed,
} from '../developers'
import { FetchOrganisationMembersParams } from '@/services/developers'
import ActionTypes from '@/constants/action-types'
import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'

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
})
