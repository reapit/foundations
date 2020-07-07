import { integrationTypesReceiveData } from '../app-integration-types'
import ActionTypes from '@/constants/action-types'

describe('app integration types actions', () => {
  it('should create a integrationTypesReceiveData action', () => {
    expect(integrationTypesReceiveData.type).toEqual(ActionTypes.INTEGRATION_TYPES_RECEIVE_DATA)
  })
})
