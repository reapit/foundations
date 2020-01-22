import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  identityTypesRequestFailure,
  identityTypesRequestData,
  identityTypesReceiveData
} from '../actions/identity-types'
import { ListItemModel } from '@reapit/foundations-ts-definitions'

export interface IdentityTypesState {
  loading: boolean
  identityTypes: ListItemModel[] | null
}

export const defaultState: IdentityTypesState = {
  loading: false,
  identityTypes: null
}

const identityTypesReducer = (state: IdentityTypesState = defaultState, action: Action<any>): IdentityTypesState => {
  if (isType(action, identityTypesRequestData)) {
    return {
      ...state,
      loading: true
    }
  }

  if (isType(action, identityTypesReceiveData)) {
    return {
      ...state,
      loading: false,
      identityTypes: action.data || null
    }
  }

  if (isType(action, identityTypesRequestFailure)) {
    return {
      ...state,
      loading: false
    }
  }

  return state
}

export default identityTypesReducer
