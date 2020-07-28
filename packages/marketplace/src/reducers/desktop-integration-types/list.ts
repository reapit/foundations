import { isType } from '@/utils/actions'
import { PagedResultDesktopIntegrationTypeModel_ } from '@reapit/foundations-ts-definitions'
import {
  fetchDesktopIntegrationTypes,
  fetchDesktopIntegrationTypesFailure,
  fetchDesktopIntegrationTypesSuccess,
} from '@/actions/desktop-integration-types'
import { Action } from '@/types/core'

export type DesktopIntegrationTypesListState = PagedResultDesktopIntegrationTypeModel_ & {
  isLoading: boolean
  errorMessage: string
}

export const defaultDesktopIntegrationTypesState: DesktopIntegrationTypesListState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
}

export const desktopIntegrationTypesListReducer = (
  state: DesktopIntegrationTypesListState = defaultDesktopIntegrationTypesState,
  action: Action<any>,
): DesktopIntegrationTypesListState => {
  if (isType(action, fetchDesktopIntegrationTypes)) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (isType(action, fetchDesktopIntegrationTypesSuccess)) {
    return {
      ...state,
      isLoading: false,
      ...action.data,
    }
  }
  if (isType(action, fetchDesktopIntegrationTypesFailure)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }
  return state
}

export default desktopIntegrationTypesListReducer
