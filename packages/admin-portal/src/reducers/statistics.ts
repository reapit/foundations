import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { statisticsRequestData, statisticsReceiveData, statisticsRequestFailure } from '@/actions/statistics'
import {
  PagedResultAppSummaryModel_,
  PagedResultDeveloperModel_,
  PagedResultInstallationModel_,
} from '@reapit/foundations-ts-definitions'

export interface StatisticsState {
  loading: boolean
  result: PagedResultAppSummaryModel_ | PagedResultDeveloperModel_ | PagedResultInstallationModel_
}

export const defaultState: StatisticsState = {
  loading: false,
  result: { data: [], totalCount: 0 },
}

const statisticsReducer = (state: StatisticsState = defaultState, action: Action<any>): StatisticsState => {
  if (isType(action, statisticsRequestData)) {
    return {
      ...state,
      loading: true,
    }
  }

  if (isType(action, statisticsReceiveData)) {
    return {
      ...state,
      loading: false,
      result: action.data,
    }
  }

  if (isType(action, statisticsRequestFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default statisticsReducer
