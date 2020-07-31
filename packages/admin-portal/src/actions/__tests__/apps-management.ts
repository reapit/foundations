import { fetchAppListSuccess, fetchAppListData, fetchAppListFailed } from '../apps-management'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'

describe('adminApps actions', () => {
  it('should create a fetchAppListSuccess action', () => {
    expect(fetchAppListSuccess.type).toEqual(ActionTypes.FETCH_APP_LIST_SUCCESS)
    expect(fetchAppListSuccess(appsDataStub.data).data).toEqual(appsDataStub.data)
  })

  it('should create a fetchAppListData action', () => {
    expect(fetchAppListData.type).toEqual(ActionTypes.FETCH_APP_LIST_DATA)
    expect(fetchAppListData({ pageNumber: 1 }).data).toEqual({ pageNumber: 1 })
  })

  it('should create a fetchAppListFailed action', () => {
    expect(fetchAppListFailed.type).toEqual(ActionTypes.FETCH_APP_LIST_FAILED)
  })
})
