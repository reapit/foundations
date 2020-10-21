import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  fetchDeveloperListSuccess,
  fetchDeveloperListFailed,
  fetchDeveloperList,
  fetchDeveloperMembersListSuccess,
} from '../../actions/devs-management'
import { DeveloperModelPagedResult, DeveloperModel, MemberModel } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type DeveloperData = DeveloperModel & {
  subRows?: MemberModel[]
}

export type DevelopersWithMembers = DeveloperModelPagedResult & {
  data: DeveloperData[]
  currentMember?: MemberModel & {
    isMember: boolean
  }
}

export type DeveloperListState = DevelopersWithMembers & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export const defaultState: DeveloperListState = getDefaultFetchListValue()

const developerListReducer = (state: DeveloperListState = defaultState, action: Action<any>): DeveloperListState => {
  if (isType(action, fetchDeveloperList)) {
    return { ...state, isLoading: true }
  }

  if (isType(action, fetchDeveloperListSuccess)) {
    return {
      ...state,
      isLoading: false,
      ...(action.data || {}),
    }
  }

  if (isType(action, fetchDeveloperMembersListSuccess)) {
    const members = action.data?.data
    const firstMember = members && members[0]

    if (!firstMember) {
      return {
        ...state,
      }
    }

    const developerToAddMembers = state.data.find(developer => developer.id === firstMember.developerId)

    if (!developerToAddMembers) {
      return {
        ...state,
      }
    }

    const developerWithMembers = {
      ...developerToAddMembers,
      subRows: members?.map(member => ({ ...member, isMember: true })),
    }

    const newDevelopers = [...state.data] as DeveloperData[]
    newDevelopers.splice(newDevelopers.indexOf(developerToAddMembers), 1, developerWithMembers)

    return {
      ...state,
      data: newDevelopers,
    }
  }

  if (isType(action, fetchDeveloperListFailed)) {
    return { ...state, isLoading: false, errorMessage: action.data }
  }

  return state
}

export default developerListReducer
