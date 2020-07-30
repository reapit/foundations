import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchDesktopIntegrationTypesParams } from '@/services/desktop-integration-types'
import { PagedResultDesktopIntegrationTypeModel_ } from '@reapit/foundations-ts-definitions'

export const fetchDesktopIntegrationTypes = actionCreator<FetchDesktopIntegrationTypesParams>(
  ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES,
)

export const fetchDesktopIntegrationTypesSuccess = actionCreator<PagedResultDesktopIntegrationTypeModel_>(
  ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES_SUCCESS,
)

export const fetchDesktopIntegrationTypesFailure = actionCreator<string>(
  ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES_FAILURE,
)
