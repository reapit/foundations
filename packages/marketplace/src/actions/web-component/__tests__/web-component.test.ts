import ActionTypes from '@/constants/action-types'
import { webComponentStub } from '@/sagas/__stubs__/web-component'
import {
  fetchWebComponentConfig,
  fetchWebComponentConfigFailed,
  fetchWebComponentConfigSuccess,
  updateWebComponentConfig,
  updateWebComponentConfigFailed,
  updateWebComponentConfigSuccess,
} from '../web-component'

describe('webComponent', () => {
  describe('fetchWebComponentConfig', () => {
    it('should create a fetchApps action', () => {
      expect(fetchWebComponentConfig.type).toEqual(ActionTypes.FETCH_WEB_COMPONENT_CONFIG)
      expect(fetchWebComponentConfig({ customerId: '123', applicationId: '123' }).data).toEqual({
        customerId: '123',
        applicationId: '123',
      })
    })
  })

  describe('fetchWebComponentConfigSuccess', () => {
    it('should create a fetchApps action', () => {
      expect(fetchWebComponentConfigSuccess.type).toEqual(ActionTypes.FETCH_WEB_COMPONENT_CONFIG_SUCCESS)
      expect(fetchWebComponentConfigSuccess(webComponentStub).data).toEqual(webComponentStub)
    })
  })

  describe('fetchWebComponentConfigFailed', () => {
    it('should create a fetchApps action', () => {
      expect(fetchWebComponentConfigFailed.type).toEqual(ActionTypes.FETCH_WEB_COMPONENT_CONFIG_FAILED)
      expect(fetchWebComponentConfigFailed('123').data).toEqual('123')
    })
  })

  describe('updateWebComponentConfig', () => {
    it('should create a fetchApps action', () => {
      expect(updateWebComponentConfig.type).toEqual(ActionTypes.UPDATE_WEB_COMPONENT_CONFIG)
    })
  })

  describe('updateWebComponentConfigSuccess', () => {
    it('should create a fetchApps action', () => {
      expect(updateWebComponentConfigSuccess.type).toEqual(ActionTypes.UPDATE_WEB_COMPONENT_CONFIG_SUCCESS)
    })
  })

  describe('updateWebComponentConfigFailed', () => {
    it('should create a fetchApps action', () => {
      expect(updateWebComponentConfigFailed.type).toEqual(ActionTypes.UPDATE_WEB_COMPONENT_CONFIG_FAILED)
      expect(updateWebComponentConfigFailed('123').data).toEqual('123')
    })
  })
})
