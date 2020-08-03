import ActionTypes from '@/constants/action-types'
import { declineAppRevision, declineAppRevisionSuccess, declineAppRevisionFailed } from '../decline-app-revision'

describe('declineAppRevision actions', () => {
  it('should delete a declineAppRevision action', () => {
    expect(declineAppRevision.type).toEqual(ActionTypes.DECLINE_APP_REVISION)
  })
  it('should delete a declineAppRevisionSuccess action', () => {
    expect(declineAppRevisionSuccess.type).toEqual(ActionTypes.DECLINE_APP_REVISION_SUCCESS)
  })
  it('should delete a declineAppRevisionFailed action', () => {
    expect(declineAppRevisionFailed.type).toEqual(ActionTypes.DECLINE_APP_REVISION_FAILED)
  })
})
