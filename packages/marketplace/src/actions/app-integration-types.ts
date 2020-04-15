import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export interface DesktopIntegrationTypeModel {
  id?: string
  name?: string
  description?: string
  url?: string
}

export interface PagedResultDesktopIntegrationTypeModel_ {
  data?: DesktopIntegrationTypeModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}

export const integrationTypesReceiveData = actionCreator<PagedResultDesktopIntegrationTypeModel_ | undefined>(
  ActionTypes.INTEGRATION_TYPES_RECEIVE_DATA,
)
