import integrationTypesReducer, { defaultDesktopIntegrationTypesState } from '../list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

describe('desktop-integration-types', () => {
  describe('desktopIntegrationTypesListReducer', () => {
    it('should return default state if action not matched', () => {
      const newState = integrationTypesReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultDesktopIntegrationTypesState)
    })

    it('should set state to test when FETCH_DESKTOP_INTEGRATION_TYPES action is called with test', () => {
      const newState = integrationTypesReducer(undefined, {
        type: ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES as ActionType,
        data: undefined,
      })
      const expected = {
        ...defaultDesktopIntegrationTypesState,
        isLoading: true,
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_DESKTOP_INTEGRATION_TYPES_SUCCESS action is called with test', () => {
      const newState = integrationTypesReducer(undefined, {
        type: ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES_SUCCESS as ActionType,
        data: integrationTypesStub,
      })
      const expected = {
        ...defaultDesktopIntegrationTypesState,
        ...integrationTypesStub,
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_DESKTOP_INTEGRATION_TYPES_FAILURE action is called with test', () => {
      const newState = integrationTypesReducer(undefined, {
        type: ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES_FAILURE as ActionType,
        data: 'mockError',
      })
      const expected = {
        ...defaultDesktopIntegrationTypesState,
        isLoading: false,
        errorMessage: 'mockError',
      }
      expect(newState).toEqual(expected)
    })
  })
})
