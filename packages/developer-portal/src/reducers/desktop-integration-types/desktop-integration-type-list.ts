import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchDesktopIntegrationTypeList,
  fetchDesktopIntegrationTypeListSuccess,
  fetchDesktopIntegrationTypeListFailed,
} from '@/actions/desktop-integration-types'
import { PagedResultDesktopIntegrationTypeModel_ } from '@reapit/foundations-ts-definitions'

export interface FetchDesktopIntegrationTypeListParams {
  page: number
  desktopIntegrationTypesPerPage?: number
}

export type DesktopIntegrationTypeListState = PagedResultDesktopIntegrationTypeModel_ & {
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: DesktopIntegrationTypeListState = {
  data: [],
  pageNumber: 0,
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
    return {
      ...state,
      ...action.data,
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
