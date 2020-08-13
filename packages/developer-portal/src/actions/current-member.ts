import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { MemberModel, UpdateMemberModel } from '@reapit/foundations-ts-definitions'

export const fetchCurrentMember = actionCreator<void>(ActionTypes.CURRENT_MEMBER_FETCH)
export const fetchCurrentMemberSuccess = actionCreator<MemberModel>(ActionTypes.CURRENT_MEMBER_FETCH_SUCCESS)
export const fetchCurrentMemberFailed = actionCreator<void>(ActionTypes.CURRENT_MEMBER_FETCH_FAILED)

export const updateCurrentMember = actionCreator<UpdateMemberModel>(ActionTypes.CURRENT_MEMBER_UPDATE)
export const updateCurrentMemberSuccess = actionCreator<void>(ActionTypes.CURRENT_MEMBER_UPDATE_SUCCESS)
export const updateCurrentMemberFailed = actionCreator<void>(ActionTypes.CURRENT_MEMBER_UPDATE_FAILED)
