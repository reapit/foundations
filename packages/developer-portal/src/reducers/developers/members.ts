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

export type MembersState = {
  loading: boolean
  pagedResult: PagedResultMemberModel_ | null
  inviteMember: {
    loading: boolean
  }
}

export const defaultState: MembersState = {
  loading: false,
  pagedResult: null,
  inviteMember: {
    loading: false,
  },
}

export const membersReducer = (state: MembersState = defaultState, action: Action<any>): MembersState => {
  if (isType(action, fetchOrganisationMembers)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, fetchOrganisationMembersSuccess)) {
    return {
      ...state,
      pagedResult: action?.data,
      loading: false,
    }
  }
  if (isType(action, fetchOrganisationMembersFailed)) {
    return {
      ...state,
      loading: false,
    }
  }
  if (isType(action, inviteDeveloperAsOrgMember)) {
    return {
      ...state,
      inviteMember: {
        loading: true,
      },
    }
  }

  if (isType(action, inviteDeveloperAsOrgMemberFailed)) {
    return {
      ...state,
      inviteMember: {
        loading: false,
      },
    }
  }

  if (isType(action, inviteDeveloperAsOrgMemberSuccess)) {
    return {
      ...state,
      inviteMember: {
        loading: false,
      },
    }
  }
  return state
}

export default membersReducer
