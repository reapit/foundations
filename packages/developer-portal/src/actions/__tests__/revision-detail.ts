import { declineRevision, declineRevisionSetFormState } from '../revision-detail'
import ActionTypes from '../../constants/action-types'

describe('revisionDetail actions', () => {
  it('should create a declineRevision action', () => {
    expect(declineRevision.type).toEqual(ActionTypes.REVISION_SUBMIT_DECLINE)
  })

  it('should create a declineRevisionSetFormState action', () => {
    expect(declineRevisionSetFormState.type).toEqual(ActionTypes.REVISION_DECLINE_SET_FORM_STATE)
  })
})
