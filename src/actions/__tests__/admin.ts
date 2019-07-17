import { adminLoading, adminReceiveRevisions, adminRequestRevisions } from '../admin'
import ActionTypes from '../../constants/action-types'

describe('admin actions', () => {
  it('should create a adminLoading action', () => {
    expect(adminLoading.type).toEqual(ActionTypes.ADMIN_LOADING)
    expect(adminLoading(true).data).toEqual(true)
  })

  it('should create a adminReceiveRevisions action', () => {
    expect(adminReceiveRevisions.type).toEqual(ActionTypes.ADMIN_RECEIVE_REVISIONS)
    expect(adminReceiveRevisions([]).data).toEqual([])
  })

  it('should create a adminRequestRevisions action', () => {
    expect(adminRequestRevisions.type).toEqual(ActionTypes.ADMIN_REQUEST_REVISIONS)
    expect(adminRequestRevisions().data).toEqual(undefined)
  })
})
