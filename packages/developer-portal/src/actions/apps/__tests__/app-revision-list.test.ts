import {
  clearAppRevisionList,
  fetchAppRevisionList,
  fetchAppRevisionListFailed,
  fetchAppRevisionListSuccess,
} from '../app-revision-list'
import ActionTypes from '@/constants/action-types'

describe('app revision list actions', () => {
  it('should create a fetchAppRevisionList action', () => {
    expect(fetchAppRevisionList.type).toEqual(ActionTypes.FETCH_APP_REVISION_LIST)
  })

  it('should create a fetchAppRevisionListSuccess action', () => {
    expect(fetchAppRevisionListSuccess.type).toEqual(ActionTypes.FETCH_APP_REVISION_LIST_SUCCESS)
  })

  it('should create a fetchAppRevisionListFailed action', () => {
    expect(fetchAppRevisionListFailed.type).toEqual(ActionTypes.FETCH_APP_REVISION_LIST_FAILED)
  })
  it('should create a clearAppRevisionList action', () => {
    expect(clearAppRevisionList.type).toEqual(ActionTypes.CLEAR_APP_REVISION_LIST)
  })
})
