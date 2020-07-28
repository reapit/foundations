import { integrationTypesReceiveData } from '../desktop-integration-types'
import ActionTypes from '@/constants/action-types'

describe('desktop-integration-types', () => {
  describe('integrationTypesReceiveData', () => {
    it('should create a integrationTypesReceiveData action', () => {
      expect(integrationTypesReceiveData.type).toEqual(ActionTypes.INTEGRATION_TYPES_RECEIVE_DATA)
    })
  })
})
