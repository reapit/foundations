import {
  clearAppRevisionDetail,
  fetchAppRevisionDetail,
  fetchAppRevisionDetailFailed,
  fetchAppRevisionDetailSuccess,
} from '../app-revision-detail'
import ActionTypes from '@/constants/action-types'

describe('app revision detail actions', () => {
  it('should create a fetchAppRevisionDetail action', () => {
    expect(fetchAppRevisionDetail.type).toEqual(ActionTypes.FETCH_APP_REVISION_DETAIL)
  })

  it('should create a fetchAppRevisionDetailSuccess action', () => {
    expect(fetchAppRevisionDetailSuccess.type).toEqual(ActionTypes.FETCH_APP_REVISION_DETAIL_SUCCESS)
  })

  it('should create a fetchAppRevisionDetailFailed action', () => {
    expect(fetchAppRevisionDetailFailed.type).toEqual(ActionTypes.FETCH_APP_REVISION_DETAIL_FAILED)
  })
  it('should create a clearAppRevisionDetail action', () => {
    expect(clearAppRevisionDetail.type).toEqual(ActionTypes.CLEAR_APP_REVISION_DETAIL)
  })
})
