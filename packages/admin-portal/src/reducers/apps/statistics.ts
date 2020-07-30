import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { statisticsRequestData, statisticsReceiveData, statisticsRequestFailure } from '@/actions/statistics'
import {
  PagedResultAppSummaryModel_,
  PagedResultDeveloperModel_,
  PagedResultInstallationModel_,
} from '@reapit/foundations-ts-definitions'
import { getDefaultFetchListValue } from '@reapit/utils'
import { FetchListResult } from '@reapit/utils'

export type StatisticsState = FetchListResult<
  PagedResultAppSummaryModel_ | PagedResultDeveloperModel_ | PagedResultInstallationModel_
>

export const defaultState = getDefaultFetchListValue() as StatisticsState

const statisticsReducer = (state: StatisticsState = defaultState, action: Action<any>): StatisticsState => {
  if (isType(action, statisticsRequestData)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, statisticsReceiveData)) {
    return {
      ...state,
      isLoading: false,
      ...action.data,
    }
  }

  if (isType(action, statisticsRequestFailure)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default statisticsReducer
