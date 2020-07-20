import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FetchOrganisationMembers, PagedResultMembersModel_ } from '@/services/developers'

export const fetchOrganisationMembers = actionCreator<FetchOrganisationMembers>(ActionTypes.ORGANISATION_FETCH_MEMBERS)
export const fetchOrganisationMembersSuccess = actionCreator<PagedResultMembersModel_>(
  ActionTypes.ORGANISATION_FETCH_MEMBERS_SUCCESS,
)
export const fetchOrganisationMembersFailed = actionCreator<void>(ActionTypes.ORGANISATION_FETCH_MEMBERS_FAILED)
