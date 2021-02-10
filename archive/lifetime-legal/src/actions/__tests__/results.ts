import { resultRequestData, resultReceiveData, resultRequestDataFailure, resultSetSearchParams } from '../results'
import ActionTypes from '../../constants/action-types'
import { contacts } from '@/sagas/__stubs__/contacts'

describe('results actions', () => {
  it('should create a resultSetSearchParams action', () => {
    expect(resultSetSearchParams.type).toEqual(ActionTypes.RESULT_SET_SEARCH_PARAMS)
    expect(resultSetSearchParams({ name: '1' }).data).toEqual({ name: '1' })
  })

  it('should create a resultRequestData action', () => {
    expect(resultRequestData.type).toEqual(ActionTypes.RESULT_REQUEST_DATA)
  })

  it('should create a resultReceiveData action', () => {
    expect(resultReceiveData.type).toEqual(ActionTypes.RESULT_RECEIVE_DATA)
    expect(resultReceiveData(contacts).data).toEqual(contacts)
  })

  it('should create a resultRequestDataFailure action', () => {
    expect(resultRequestDataFailure.type).toEqual(ActionTypes.RESULT_REQUEST_FAILURE)
  })
})
