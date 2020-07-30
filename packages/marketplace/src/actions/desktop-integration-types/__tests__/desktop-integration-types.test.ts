import ActionTypes from '@/constants/action-types'
import {
  fetchDesktopIntegrationTypes,
  fetchDesktopIntegrationTypesSuccess,
  fetchDesktopIntegrationTypesFailed,
} from '../desktop-integration-types'

describe('desktop-integration-types', () => {
  describe('fetchDesktopIntegrationTypes', () => {
    it('should create a fetchDesktopIntegrationTypes action', () => {
      expect(fetchDesktopIntegrationTypes.type).toEqual(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES)
    })
  })

  describe('fetchDesktopIntegrationTypesSuccess', () => {
    it('should create a fetchDesktopIntegrationTypesSuccess action', () => {
      expect(fetchDesktopIntegrationTypesSuccess.type).toEqual(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES_SUCCESS)
    })
  })

  describe('fetchDesktopIntegrationTypesFailed', () => {
    it('should create a fetchDesktopIntegrationTypesFailed action', () => {
      expect(fetchDesktopIntegrationTypesFailed.type).toEqual(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES_FAILURE)
    })
  })
})
