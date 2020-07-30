import desktopIntegrationTypeListReducer, {
  defaultState,
  DesktopIntegrationTypeListState,
} from '../desktop-integration-type-list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

describe('desktopIntegrationType-list reducer', () => {
  it('should set loading when FETCH_DESKTOP_INTEGRATION_TYPE_LIST action is called', () => {
    const newState = desktopIntegrationTypeListReducer(undefined, {
      type: ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST as ActionType,
      data: null,
    })
    const expected: DesktopIntegrationTypeListState = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })
  it('should set data when FETCH_DESKTOP_INTEGRATION_TYPE_LIST_SUCCESS action is called', () => {
    const newState = desktopIntegrationTypeListReducer(undefined, {
      type: ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST_SUCCESS as ActionType,
      data: integrationTypesStub,
    })
    const { data, pageNumber, pageSize, totalCount } = integrationTypesStub
    const expected: DesktopIntegrationTypeListState = {
      ...defaultState,
      data,
      totalCount,
      pageSize,
      page: pageNumber,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
  it('should set error message when FETCH_DESKTOP_INTEGRATION_TYPE_LIST_FAILED action is called', () => {
    const newState = desktopIntegrationTypeListReducer(undefined, {
      type: ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST_FAILED as ActionType,
      data: 'test',
    })
    const expected: DesktopIntegrationTypeListState = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'test',
    }
    expect(newState).toEqual(expected)
  })
})
