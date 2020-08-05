import { fetchDeveloperList, fetchDeveloperListFailed, fetchDeveloperListSuccess } from '../devs-management'
import ActionTypes from '../../constants/action-types'

describe('admin dev management actions', () => {
  it('should create a fetchDeveloperList action', () => {
    expect(fetchDeveloperList.type).toEqual(ActionTypes.FETCH_DEVELOPER_LIST)
  })

  it('should create a fetchDeveloperListFailed action', () => {
    expect(fetchDeveloperListFailed.type).toEqual(ActionTypes.FETCH_DEVELOPER_LIST_FAILED)
  })

  it('should create a fetchDeveloperListSuccess action', () => {
    expect(fetchDeveloperListSuccess.type).toEqual(ActionTypes.FETCH_DEVELOPER_LIST_SUCCESS)
  })
})
