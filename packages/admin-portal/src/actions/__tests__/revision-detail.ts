import {
  fetchRevisionSuccess,
  fetchRevision,
  requestApproveRevision,
  requestDeclineRevision,
  setRequestApproveRevisionFormState,
  setRequestDeclineRevisionFormState,
  RevisionDetailRequestParams,
} from '../revision-detail'
import ActionTypes from '../../constants/action-types'
import { revisionDetailDataStub } from '@/sagas/apps/__stubs__/revision-detail'

const params: RevisionDetailRequestParams = {
  appId: 's82jds9',
  appRevisionId: 'shd887la',
}

describe('revisionDetail actions', () => {
  it('should create a fetchRevisionSuccess action', () => {
    expect(fetchRevisionSuccess.type).toEqual(ActionTypes.FETCH_REVISION_SUCCESS)
    expect(fetchRevisionSuccess(revisionDetailDataStub).data).toEqual(revisionDetailDataStub)
  })

  it('should create a fetchRevision action', () => {
    expect(fetchRevision.type).toEqual(ActionTypes.FETCH_REVISION)
    expect(fetchRevision(params).data).toEqual(params)
  })

  it('should create a requestApproveRevision action', () => {
    expect(requestApproveRevision.type).toEqual(ActionTypes.REQUEST_APPROVE_REVISION)
  })

  it('should create a setRequestApproveRevisionFormState action', () => {
    expect(setRequestApproveRevisionFormState.type).toEqual(ActionTypes.SET_REQUEST_APPROVE_REVISION_FORM_STATE)
  })

  it('should create a requestDeclineRevision action', () => {
    expect(requestDeclineRevision.type).toEqual(ActionTypes.REQUEST_DECLINE_REVISION)
  })

  it('should create a setRequestDeclineRevisionFormState action', () => {
    expect(setRequestDeclineRevisionFormState.type).toEqual(ActionTypes.SET_REQUEST_DECLINE_REVISION_FORM_STATE)
  })
})
