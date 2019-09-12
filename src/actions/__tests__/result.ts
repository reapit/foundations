import { resultRequestData, resultReceiveData, resultRequestDataFailure } from '../result'
import ActionTypes from '../../constants/action-types'

describe('search client actions', () => {
  it('should create a clientSearchRequest action', () => {
    expect(resultRequestData.type).toEqual(ActionTypes.RESULT_REQUEST_DATA)
  })

  it('should create a resultReceiveData action', () => {
    expect(resultReceiveData.type).toEqual(ActionTypes.RESULT_RECEIVE_DATA)
  })

  it('should create a resultRequestDataFailure action', () => {
    expect(resultRequestDataFailure.type).toEqual(ActionTypes.RESULT_REQUEST_FAILURE)
  })
})
