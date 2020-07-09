import {
  authenticatedRequestData,
  authenticatedReceiveData,
  authenticatedRequestDataFailure,
  authenticatedLoading,
  authenticatedClearData,
} from '../authenticated'
import ActionTypes from '../../constants/action-types'

describe('authenticated actions', () => {
  it('should create correct actions', () => {
    expect(authenticatedRequestData.type).toEqual(ActionTypes.AUTHENTICATED_REQUEST_DATA)
    expect(authenticatedReceiveData.type).toEqual(ActionTypes.AUTHENTICATED_RECEIVE_DATA)
    expect(authenticatedRequestDataFailure.type).toEqual(ActionTypes.AUTHENTICATED_REQUEST_FAILURE)
    expect(authenticatedLoading.type).toEqual(ActionTypes.AUTHENTICATED_LOADING)
    expect(authenticatedClearData.type).toEqual(ActionTypes.AUTHENTICATED_CLEAR_DATA)
  })
})
