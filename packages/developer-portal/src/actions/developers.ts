import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FetchOrganisationMembers } from '@/services/developers'
import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'

export const fetchOrganisationMembers = actionCreator<FetchOrganisationMembers>(ActionTypes.ORGANISATION_FETCH_MEMBERS)
export const fetchOrganisationMembersSuccess = actionCreator<PagedResultMemberModel_>(
  ActionTypes.ORGANISATION_FETCH_MEMBERS_SUCCESS,
)
export const fetchOrganisationMembersFailed = actionCreator<void>(ActionTypes.ORGANISATION_FETCH_MEMBERS_FAILED)
