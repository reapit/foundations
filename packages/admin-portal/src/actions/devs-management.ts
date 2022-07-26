import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DeveloperModelPagedResult, MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  DisableDeveloperMemberParams,
  UpdateDeveloperMemberParams,
  FetchDeveloperMembersParams,
} from '../services/developers'

export interface FetchDeveloperListValues {
  page: number
  queryString: string
}

export interface DeveloperMemberListValues {
  id: string
}

export type SetAsAdminParams = UpdateDeveloperMemberParams & {
  callback?: () => void
}

export type DisableMemberActionParams = DisableDeveloperMemberParams & { callback: (isSuccess: boolean) => void }

export const fetchDeveloperList = actionCreator<FetchDeveloperListValues>(ActionTypes.FETCH_DEVELOPER_LIST)
export const fetchDeveloperListFailed = actionCreator<string>(ActionTypes.FETCH_DEVELOPER_LIST_FAILED)
export const fetchDeveloperListSuccess = actionCreator<DeveloperModelPagedResult | undefined>(
  ActionTypes.FETCH_DEVELOPER_LIST_SUCCESS,
)
export const fetchDeveloperMemberList = actionCreator<FetchDeveloperMembersParams>(
  ActionTypes.FETCH_DEVELOPER_MEMBER_LIST,
)
export const fetchDeveloperMembersListSuccess = actionCreator<MemberModelPagedResult | undefined>(
  ActionTypes.FETCH_DEVELOPER_MEMBERS_LIST_SUCCESS,
)
export const disableMember = actionCreator<DisableMemberActionParams>(ActionTypes.DISABLE_MEMBER)
export const setAsAdmin = actionCreator<SetAsAdminParams>(ActionTypes.SET_AS_ADMIN)
