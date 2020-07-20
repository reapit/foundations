import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  fetchOrganisationMembers,
  fetchOrganisationMembersSuccess,
  fetchOrganisationMembersFailed,
} from '@/actions/developers'
import { PagedResultMembersModel_ } from '@/services/developers'

export interface MembersState {
  loading: boolean
  data: PagedResultMembersModel_ | null
}

export const defaultState: MembersState = {
  loading: false,
  data: null,
}

const membersReducer = (state: MembersState = defaultState, action: Action<any>): MembersState => {
  if (isType(action, fetchOrganisationMembers)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, fetchOrganisationMembersSuccess)) {
    return {
      ...state,
      data: action.data,
      loading: false,
    }
  }
  if (isType(action, fetchOrganisationMembersFailed)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default membersReducer
