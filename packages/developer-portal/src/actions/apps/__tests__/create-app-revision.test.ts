import ActionTypes from '@/constants/action-types'
import { createAppRevision, createAppRevisionSuccess, createAppRevisionFailed } from '../create-app-revision'

describe('createAppRevision actions', () => {
  it('should create a createAppRevision action', () => {
    expect(createAppRevision.type).toEqual(ActionTypes.CREATE_APP_REVISION)
  })
  it('should create a createAppRevisionSuccess action', () => {
    expect(createAppRevisionSuccess.type).toEqual(ActionTypes.CREATE_APP_REVISION_SUCCESS)
  })
  it('should create a createAppRevisionFailed action', () => {
    expect(createAppRevisionFailed.type).toEqual(ActionTypes.CREATE_APP_REVISION_FAILED)
  })
})
