import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  inviteDeveloperAsOrgMember,
  inviteDeveloperAsOrgMemberFailed,
  fetchOrganisationMembers,
  fetchOrganisationMembersSuccess,
  fetchOrganisationMembersFailed,
  inviteDeveloperAsOrgMemberSuccess,
} from '@/actions/developers'
import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'

export type MembersState = PagedResultMemberModel_ & {
  isLoading: boolean
  errorMessage?: string | null
  inviteMember: {
    isLoading: boolean
  }
}

export const defaultState: MembersState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  totalCount: 0,
  isLoading: false,
  inviteMember: {
    isLoading: false,
  },
  errorMessage: null,
}

export const membersReducer = (state: MembersState = defaultState, action: Action<any>): MembersState => {
  if (isType(action, fetchOrganisationMembers)) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (isType(action, fetchOrganisationMembersSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
    }
  }
  if (isType(action, fetchOrganisationMembersFailed)) {
    return {
      ...state,
      errorMessage: action.data,
      isLoading: false,
    }
  }
  if (isType(action, inviteDeveloperAsOrgMember)) {
    return {
      ...state,
      inviteMember: {
        isLoading: true,
      },
    }
  }

  if (isType(action, inviteDeveloperAsOrgMemberFailed)) {
    return {
      ...state,
      inviteMember: {
        isLoading: false,
      },
    }
  }

  if (isType(action, inviteDeveloperAsOrgMemberSuccess)) {
    return {
      ...state,
      inviteMember: {
        isLoading: false,
      },
    }
  }
  return state
}

export default membersReducer
