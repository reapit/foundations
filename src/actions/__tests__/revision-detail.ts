import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailRequestData,
  revisionDetailClearData,
  approveRevision,
  declineRevision,
  approveRevisionSetFormState,
  declineRevisionSetFormState,
  RevisionDetailRequestParams
} from '../revision-detail'
import ActionTypes from '../../constants/action-types'
import { revisionDetailDataStub } from '../../sagas/__stubs__/revision-detail'

const params: RevisionDetailRequestParams = {
  appId: 's82jds9',
  appRevisionId: 'shd887la'
}

describe('revisionDetail actions', () => {
  it('should create a revisionDetailLoading action', () => {
    expect(revisionDetailLoading.type).toEqual(ActionTypes.REVISION_DETAIL_LOADING)
    expect(revisionDetailLoading(true).data).toEqual(true)
  })

  it('should create a revisionDetailReceiveData action', () => {
    expect(revisionDetailReceiveData.type).toEqual(ActionTypes.REVISION_DETAIL_RECEIVE_DATA)
    expect(revisionDetailReceiveData(revisionDetailDataStub).data).toEqual(revisionDetailDataStub)
  })

  it('should create a revisionDetailRequestData action', () => {
    expect(revisionDetailRequestData.type).toEqual(ActionTypes.REVISION_DETAIL_REQUEST_DATA)
    expect(revisionDetailRequestData(params).data).toEqual(params)
  })

  it('should create a revisionDetailClearData action', () => {
    expect(revisionDetailClearData.type).toEqual(ActionTypes.REVISION_DETAIL_CLEAR_DATA)
    expect(revisionDetailClearData(null).data).toEqual(null)
  })

  it('should create a approveRevision action', () => {
    expect(approveRevision.type).toEqual(ActionTypes.REVISION_SUBMIT_APPROVE)
  })

  it('should create a approveRevisionSetFormState action', () => {
    expect(approveRevisionSetFormState.type).toEqual(ActionTypes.REVISION_APPROVE_SET_FORM_STATE)
  })

  it('should create a declineRevision action', () => {
    expect(declineRevision.type).toEqual(ActionTypes.REVISION_SUBMIT_DECLINE)
  })

  it('should create a declineRevisionSetFormState action', () => {
    expect(declineRevisionSetFormState.type).toEqual(ActionTypes.REVISION_DECLINE_SET_FORM_STATE)
  })
})
