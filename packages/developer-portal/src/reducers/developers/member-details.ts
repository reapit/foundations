import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchMemberDetails,
  fetchMemberDetailsSuccess,
  fetchMemberDetailsFailed,
  setInviteMemberStatus,
} from '@/actions/developers'
import { MemberModel } from '@reapit/foundations-ts-definitions'

export type InviteMemberStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ACCEPTING' | 'REJECTING' | 'ERROR'

export interface MemberDetailsState {
  loading: boolean
  data: MemberModel | null
  inviteStatus: InviteMemberStatus
}

export const defaultState: MemberDetailsState = {
  loading: false,
  data: null,
  inviteStatus: 'PENDING',
}

const memberDetailsReducer = (state: MemberDetailsState = defaultState, action: Action<any>): MemberDetailsState => {
  if (isType(action, fetchMemberDetails)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, fetchMemberDetailsSuccess)) {
    return {
      ...state,
      data: action.data,
      loading: false,
    }
  }

  if (isType(action, fetchMemberDetailsFailed)) {
    return {
      ...state,
      loading: false,
    }
  }

  if (isType(action, setInviteMemberStatus)) {
    return {
      ...state,
      inviteStatus: action.data,
    }
  }

  return state
}

export default memberDetailsReducer
