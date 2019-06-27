import { developerLoading, developerReceiveData, developerRequestData, developerClearData } from '../developer'
import ActionTypes from '../../constants/action-types'
import { developerDataStub } from '../../sagas/__stubs__/developer'

describe('developer actions', () => {
  it('should create a developerLoading action', () => {
    expect(developerLoading.type).toEqual(ActionTypes.DEVELOPER_LOADING)
    expect(developerLoading(true).data).toEqual(true)
  })

  it('should create a developerReceiveData action', () => {
    expect(developerReceiveData.type).toEqual(ActionTypes.DEVELOPER_RECEIVE_DATA)
    expect(developerReceiveData(developerDataStub).data).toEqual(developerDataStub)
  })

  it('should create a developerRequestData action', () => {
    expect(developerRequestData.type).toEqual(ActionTypes.DEVELOPER_REQUEST_DATA)
    expect(developerRequestData().data).toEqual(undefined)
  })

  it('should create a developerClearData action', () => {
    expect(developerClearData.type).toEqual(ActionTypes.DEVELOPER_CLEAR_DATA)
    expect(developerClearData(null).data).toEqual(null)
  })
})
