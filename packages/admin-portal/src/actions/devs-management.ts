import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultDeveloperModel_, PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'
import {
  DisableMemberParams,
  UpdateOrganisationMemberByIdParams,
  FetchOrganisationMembersParams,
} from '../services/developers'

export interface fetchDeveloperListValues {
  page: number
  queryString: string
}

export interface DeveloperMemberListValues {
  id: string
}

export type SetAsAdminParams = UpdateOrganisationMemberByIdParams & {
  callback?: () => void
}

export const fetchDeveloperList = actionCreator<fetchDeveloperListValues>(ActionTypes.FETCH_DEVELOPER_LIST)
export const fetchDeveloperListFailed = actionCreator<string>(ActionTypes.FETCH_DEVELOPER_LIST_FAILED)
export const fetchDeveloperListSuccess = actionCreator<PagedResultDeveloperModel_ | undefined>(
  ActionTypes.FETCH_DEVELOPER_LIST_SUCCESS,
)

export const fetchDeveloperMemberList = actionCreator<FetchOrganisationMembersParams>(
  ActionTypes.FETCH_DEVELOPER_MEMBER_LIST,
)
export const fetchDeveloperMemberListFailed = actionCreator<string>(ActionTypes.FETCH_DEVELOPER_MEMBER_LIST_FAILED)
export const fetchDeveloperMembersListSuccess = actionCreator<PagedResultMemberModel_ | undefined>(
  ActionTypes.FETCH_DEVELOPER_MEMBERS_LIST_SUCCESS,
)

export type DisableMemberActionParams = DisableMemberParams & { callback: (isSuccess: boolean) => void }
export const disableMember = actionCreator<DisableMemberActionParams>(ActionTypes.DISABLE_MEMBER)
export const disableMemberSuccess = actionCreator<void>(ActionTypes.DISABLE_MEMBER_SUCCESS)
export const disableMemberFailed = actionCreator<void>(ActionTypes.DISABLE_MEMBER_FAILED)

export const setAsAdmin = actionCreator<SetAsAdminParams>(ActionTypes.SET_AS_ADMIN)
export const setAsAdminSuccess = actionCreator<void>(ActionTypes.SET_AS_ADMIN_SUCCESS)
export const setAsAdminFailed = actionCreator<void>(ActionTypes.SET_AS_ADMIN_FAILED)
