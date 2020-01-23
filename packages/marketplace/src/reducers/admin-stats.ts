import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { adminStatsRequestData, adminStatsReceiveData, adminStatsRequestFailure } from '@/actions/admin-stats'
import {
  PagedResultAppSummaryModel_,
  PagedResultDeveloperModel_,
  PagedResultInstallationModel_
} from '@reapit/foundations-ts-definitions'

export interface AdminStatsState {
  loading: boolean
  result: PagedResultAppSummaryModel_ | PagedResultDeveloperModel_ | PagedResultInstallationModel_
}

export const defaultState: AdminStatsState = {
  loading: false,
  result: { data: [], totalCount: 0 }
}

const adminStatsReducer = (state: AdminStatsState = defaultState, action: Action<any>): AdminStatsState => {
  if (isType(action, adminStatsRequestData)) {
    return {
      ...state,
      loading: true
    }
  }

  if (isType(action, adminStatsReceiveData)) {
    console.log('xxx adminStatsReceiveData', action)
    return {
      ...state,
      loading: false,
      result: action.data
    }
  }

  if (isType(action, adminStatsRequestFailure)) {
    return {
      ...state,
      loading: false
    }
  }

  return state
}

export default adminStatsReducer
