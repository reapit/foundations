import { clearAppDetail, fetchAppDetail, fetchAppDetailFailed, fetchAppDetailSuccess } from '../app-detail'
import ActionTypes from '@/constants/action-types'

describe('app detail actions', () => {
  it('should create a fetchAppDetail action', () => {
    expect(fetchAppDetail.type).toEqual(ActionTypes.FETCH_APP_DETAIL)
  })

  it('should create a fetchAppDetailSuccess action', () => {
    expect(fetchAppDetailSuccess.type).toEqual(ActionTypes.FETCH_APP_DETAIL_SUCCESS)
  })

  it('should create a fetchAppDetailFailed action', () => {
    expect(fetchAppDetailFailed.type).toEqual(ActionTypes.FETCH_APP_DETAIL_FAILED)
  })
  it('should create a clearAppDetail action', () => {
    expect(clearAppDetail.type).toEqual(ActionTypes.CLEAR_APP_DETAIL)
  })
})
