import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { myAppsReceiveData, myAppsRequestData, myAppsRequestDataFailure } from '@/actions/apps'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'

export type InstalledAppsState = PagedResultAppSummaryModel_ & {
  isLoading: boolean
  errorMessage: string
}

export const defaultInstalledAppsState: InstalledAppsState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
}

export const installedAppReducer = (
  state: InstalledAppsState = defaultInstalledAppsState,
  action: Action<any>,
): InstalledAppsState => {
  if (isType(action, myAppsRequestData)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, myAppsReceiveData)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, myAppsRequestDataFailure)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
