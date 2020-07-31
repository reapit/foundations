import { fetchAppDetailLoading, receiveAppDetailData, fetchAppDetailData, fetchAppDetailFailed } from '../app-detail'
import ActionTypes from '@/constants/action-types'
import { appDetailDataStub } from '@/sagas/apps/__stubs__/app-detail'

describe('appDetail actions', () => {
  it('should create a fetchAppDetailLoading action', () => {
    expect(fetchAppDetailLoading.type).toEqual(ActionTypes.FETCH_APP_DETAIL_LOADING)
    expect(fetchAppDetailLoading(true).data).toEqual(true)
  })

  it('should create a receiveAppDetailData action', () => {
    expect(receiveAppDetailData.type).toEqual(ActionTypes.RECEIVE_FETCH_APP_DETAIL_DATA)
    expect(receiveAppDetailData(appDetailDataStub).data).toEqual(appDetailDataStub)
  })

  it('should create a fetchAppDetailData action', () => {
    expect(fetchAppDetailData.type).toEqual(ActionTypes.FETCH_APP_DETAIL_DATA)
    expect(fetchAppDetailData({ id: '1', clientId: '1' }).data).toEqual({ id: '1', clientId: '1' })
  })

  it('should create a fetchAppDetailFailed action', () => {
    expect(fetchAppDetailFailed.type).toEqual(ActionTypes.FETCH_APP_DETAIL_DATA_FAILURE)
  })
})
