import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchStatistics, fetchStatisticsSucces, fetchStatisticsFailed } from '@/actions/statistics'
import {
  AppSummaryModelPagedResult,
  DeveloperModelPagedResult,
  InstallationModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { getDefaultFetchListValue } from '@reapit/utils'
import { FetchListResult } from '@reapit/utils'

export type StatisticsState = FetchListResult<
  AppSummaryModelPagedResult | DeveloperModelPagedResult | InstallationModelPagedResult
>

export const defaultState = getDefaultFetchListValue() as StatisticsState

const statisticsReducer = (state: StatisticsState = defaultState, action: Action<any>): StatisticsState => {
  if (isType(action, fetchStatistics)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchStatisticsSucces)) {
    return {
      ...state,
      isLoading: false,
      ...action.data,
    }
  }

  if (isType(action, fetchStatisticsFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}

export default statisticsReducer
