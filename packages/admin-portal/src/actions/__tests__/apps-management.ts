import { fetchAppListSuccess, fetchAppList, fetchAppListFailed } from '../apps-management'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'

describe('adminApps actions', () => {
  it('should create a fetchAppListSuccess action', () => {
    expect(fetchAppListSuccess.type).toEqual(ActionTypes.FETCH_APP_LIST_SUCCESS)
    expect(fetchAppListSuccess(appsDataStub.data).data).toEqual(appsDataStub.data)
  })

  it('should create a fetchAppList action', () => {
    expect(fetchAppList.type).toEqual(ActionTypes.FETCH_APP_LIST)
    expect(fetchAppList({ pageNumber: 1 }).data).toEqual({ pageNumber: 1 })
  })

  it('should create a fetchAppListFailed action', () => {
    expect(fetchAppListFailed.type).toEqual(ActionTypes.FETCH_APP_LIST_FAILED)
  })
})
