import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { PagedResultAppRevisionModel_ } from '@reapit/foundations-ts-definitions'
import { revisionsRequestData, revisionsReceiveData, revisionsRequestDataFailure } from '@/actions/revisions'

export interface RevisionsState {
  loading: boolean
  revisions: PagedResultAppRevisionModel_ | null
}

export const defaultState: RevisionsState = {
  loading: false,
  revisions: null,
}

const revisionsReducer = (state: RevisionsState = defaultState, action: Action<any>): RevisionsState => {
  if (isType(action, revisionsRequestData)) {
    return { ...state, loading: true }
  }
  if (isType(action, revisionsReceiveData)) {
    return { ...state, loading: false, revisions: action.data }
  }
  if (isType(action, revisionsRequestDataFailure)) {
    return { ...state, loading: false }
  }
  return state
}

export default revisionsReducer
