import { clearAppList, fetchAppList, fetchAppListFailed, fetchAppListSuccess } from '../app-list'
import ActionTypes from '@/constants/action-types'

describe('app list actions', () => {
  it('should create a fetchAppList action', () => {
    expect(fetchAppList.type).toEqual(ActionTypes.FETCH_APP_LIST)
  })

  it('should create a fetchAppListSuccess action', () => {
    expect(fetchAppListSuccess.type).toEqual(ActionTypes.FETCH_APP_LIST_SUCCESS)
  })

  it('should create a fetchAppListFailed action', () => {
    expect(fetchAppListFailed.type).toEqual(ActionTypes.FETCH_APP_LIST_FAILED)
  })
  it('should create a clearAppList action', () => {
    expect(clearAppList.type).toEqual(ActionTypes.CLEAR_APP_LIST)
  })
})
