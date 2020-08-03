import { fetchAppDetailSuccess, fetchAppDetail, fetchAppDetailFailed } from '../app-detail'
import ActionTypes from '@/constants/action-types'
import { appDetailDataStub } from '@/sagas/apps/__stubs__/app-detail'

describe('appDetail actions', () => {
  it('should create a fetchAppDetailSuccess action', () => {
    expect(fetchAppDetailSuccess.type).toEqual(ActionTypes.FETCH_APP_DETAIL_SUCCESS)
    expect(fetchAppDetailSuccess(appDetailDataStub).data).toEqual(appDetailDataStub)
  })

  it('should create a fetchAppDetail action', () => {
    expect(fetchAppDetail.type).toEqual(ActionTypes.FETCH_APP_DETAIL)
    expect(fetchAppDetail({ id: '1', clientId: '1' }).data).toEqual({ id: '1', clientId: '1' })
  })

  it('should create a fetchAppDetailFailed action', () => {
    expect(fetchAppDetailFailed.type).toEqual(ActionTypes.FETCH_APP_DETAIL_FAILED)
  })
})
