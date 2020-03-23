import { revisionsReceiveData, revisionsRequestData, revisionsRequestDataFailure } from '../revisions'
import ActionTypes from '@/constants/action-types'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'

describe('app revisions', () => {
  it('should create a revisionsRequestData action', () => {
    expect(revisionsRequestData.type).toEqual(ActionTypes.REVISIONS_REQUEST_DATA)
    expect(revisionsRequestData({ appId: '1' }).data).toEqual({ appId: '1' })
  })
  it('should create a revisionsReceiveData action', () => {
    expect(revisionsReceiveData.type).toEqual(ActionTypes.REVISIONS_RECEIVE_DATA)
    expect(revisionsReceiveData(revisionsDataStub).data).toEqual(revisionsDataStub)
  })
  it('should create a revisionsRequestDataFailure action', () => {
    expect(revisionsRequestDataFailure.type).toEqual(ActionTypes.REVISIONS_REQUEST_DATA_FAILURE)
  })
})
