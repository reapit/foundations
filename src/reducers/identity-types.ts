import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import {
  identityTypesRequestFailure,
  identityTypesRequestData,
  identityTypesReceiveData
} from '../actions/identity-types'

export interface IdentityTypesState {
  loading: boolean
  identityTypes: ListItemModel[]
}

export const defaultState: IdentityTypesState = {
  loading: false,
  identityTypes: []
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
      identityTypes: action.data || []
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
