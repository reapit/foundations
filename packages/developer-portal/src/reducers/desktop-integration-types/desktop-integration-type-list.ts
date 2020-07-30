import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchDesktopIntegrationTypeList,
  fetchDesktopIntegrationTypeListSuccess,
  fetchDesktopIntegrationTypeListFailed,
} from '@/actions/desktop-integration-types'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'

export interface FetchDesktopIntegrationTypeListParams {
  page: number
  desktopIntegrationTypesPerPage?: number
}

export interface DesktopIntegrationTypeListState {
  data?: DesktopIntegrationTypeModel[]
  page?: number
  pageSize?: number
  totalCount?: number
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: DesktopIntegrationTypeListState = {
  data: [],
  page: 0,
  pageSize: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: null,
}

const desktopIntegrationTypeListReducer = (
  state: DesktopIntegrationTypeListState = defaultState,
  action: Action<any>,
): DesktopIntegrationTypeListState => {
  if (isType(action, fetchDesktopIntegrationTypeList)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchDesktopIntegrationTypeListSuccess)) {
    const { data, pageNumber, pageSize, totalCount } = action.data
    return {
      ...state,
      data,
      totalCount,
      pageSize,
      page: pageNumber,
      isLoading: false,
    }
  }

  if (isType(action, fetchDesktopIntegrationTypeListFailed)) {
    return {
      ...state,
      errorMessage: action.data,
      isLoading: false,
    }
  }
  return state
}

export default desktopIntegrationTypeListReducer
