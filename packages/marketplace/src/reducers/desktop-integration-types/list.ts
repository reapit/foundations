import { isType } from '@/utils/actions'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  fetchDesktopIntegrationTypes,
  fetchDesktopIntegrationTypesFailed,
  fetchDesktopIntegrationTypesSuccess,
} from '@/actions/desktop-integration-types'
import { Action } from '@/types/core'

export type DesktopIntegrationTypesState = DesktopIntegrationTypeModelPagedResult & {
  isLoading: boolean
  errorMessage: string
}

export const defaultDesktopIntegrationTypesState: DesktopIntegrationTypesState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
}

export const desktopIntegrationTypesReducer = (
  state: DesktopIntegrationTypesState = defaultDesktopIntegrationTypesState,
  action: Action<any>,
): DesktopIntegrationTypesState => {
  if (isType(action, fetchDesktopIntegrationTypes)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }
  if (isType(action, fetchDesktopIntegrationTypesSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }
  if (isType(action, fetchDesktopIntegrationTypesFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }
  return state
}
