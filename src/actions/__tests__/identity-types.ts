import ActionTypes from '../../constants/action-types'
import { identityTypesReceiveData, identityTypesRequestData, identityTypesRequestFailure } from '../identity-types'
import { identityTypes } from '../../sagas/__stubs__/identity-types'

describe('checklist-detail actions', () => {
  it('should create a identityTypesRequestData action', () => {
    expect(identityTypesRequestData.type).toEqual(ActionTypes.IDENTITY_TYPES_REQUEST_DATA)
  })

  it('should create a identityTypesReceiveData action', () => {
    expect(identityTypesReceiveData.type).toEqual(ActionTypes.IDENTITY_TYPES_RECEIVE_DATA)
    expect(identityTypesReceiveData(identityTypes).data).toEqual(identityTypes)
  })
  it('should create a identityTypesRequestFailure action', () => {
    expect(identityTypesRequestFailure.type).toEqual(ActionTypes.IDENTITY_TYPES_REQUEST_FAILURE)
  })
})
