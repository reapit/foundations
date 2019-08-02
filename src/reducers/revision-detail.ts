import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { AppRevisionModel } from '@/types/marketplace-api-schema'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailClearData,
  revisionDetailFailure
} from '../actions/revision-detail'

export interface RevisionDetailItem {
  data: AppRevisionModel
}

export interface RevisionDetailState {
  loading: boolean
  error: boolean
  revisionDetailData: RevisionDetailItem | null
}

export const defaultState: RevisionDetailState = {
  loading: false,
  error: false,
  revisionDetailData: null
}

const revisionDetailReducer = (state: RevisionDetailState = defaultState, action: Action<any>): RevisionDetailState => {
  if (isType(action, revisionDetailLoading)) {
    return {
      ...state,
      error: false,
      loading: action.data
    }
  }

  if (isType(action, revisionDetailReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      revisionDetailData: action.data || null
    }
  }

  if (isType(action, revisionDetailClearData)) {
    return {
      ...state,
      loading: false,
      error: false,
      revisionDetailData: action.data
    }
  }

  if (isType(action, revisionDetailFailure)) {
    return {
      ...state,
      loading: false,
      error: true
    }
  }

  return state
}

export default revisionDetailReducer
