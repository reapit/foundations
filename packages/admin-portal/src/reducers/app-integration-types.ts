import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { integrationTypesReceiveData, PagedResultDesktopIntegrationTypeModel_ } from '@/actions/app-integration-types'
import { APPS_PER_PAGE } from '@/constants/paginator'

export type IntegrationTypeState = PagedResultDesktopIntegrationTypeModel_

export const defaultState: IntegrationTypeState = {
  data: [],
  pageNumber: 1,
  pageSize: APPS_PER_PAGE,
  pageCount: 1,
  totalCount: 0,
}

const integrationTypesReducer = (
  state: IntegrationTypeState = defaultState,
  action: Action<any>,
): IntegrationTypeState => {
  if (isType(action, integrationTypesReceiveData)) {
    return {
      ...state,
      ...action.data,
    }
  }

  return state
}

export default integrationTypesReducer
