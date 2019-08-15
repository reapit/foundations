import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import {
  developerLoading,
  developerReceiveData,
  developerClearData,
  developerCreate,
  developerSetFormState
} from '../actions/developer'
import { PagedResultAppSummaryModel_, ScopeModel } from '@/types/marketplace-api-schema'

export interface DeveloperItem {
  data: PagedResultAppSummaryModel_
  scopes: ScopeModel[]
}

export interface DeveloperState {
  loading: boolean
  developerData: DeveloperItem | null
  formState: FormState
}

export const defaultState: DeveloperState = {
  loading: false,
  developerData: null,
  formState: 'PENDING'
}

const developerReducer = (state: DeveloperState = defaultState, action: Action<any>): DeveloperState => {
  if (isType(action, developerLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, developerReceiveData)) {
    return {
      ...state,
      loading: false,
      developerData: action.data || null
    }
  }

  if (isType(action, developerClearData)) {
    return {
      ...state,
      loading: false,
      developerData: action.data
    }
  }

  if (isType(action, developerSetFormState)) {
    return {
      ...state,
      formState: action.data
    }
  }

  return state
}

export default developerReducer
