import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  fetchOrganisationMembers,
  fetchOrganisationMembersSuccess,
  fetchOrganisationMembersFailed,
} from '@/actions/developers'
import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'

export interface MembersState {
  loading: boolean
  pagedResult: PagedResultMemberModel_ | null
}

export const defaultState: MembersState = {
  loading: false,
  pagedResult: null,
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
      pagedResult: action.data,
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
