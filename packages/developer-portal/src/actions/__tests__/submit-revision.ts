import { submitRevision, submitRevisionSetFormState } from '../submit-revision'
import ActionTypes from '../../constants/action-types'

describe('submitRevision actions', () => {
  it('should create a submitRevision action', () => {
    expect(submitRevision.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_REVISION)
  })

  it('should create a submitRevisionSetFormState action', () => {
    expect(submitRevisionSetFormState.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE)
  })
})
