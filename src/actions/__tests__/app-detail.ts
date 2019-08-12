import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailRequestData,
  appDetailClearData,
  appDetailFailure
} from '../app-detail'
import ActionTypes from '../../constants/action-types'
import { appDetailDataStub } from '../../sagas/__stubs__/app-detail'

describe('appDetail actions', () => {
  it('should create a appDetailLoading action', () => {
    expect(appDetailLoading.type).toEqual(ActionTypes.APP_DETAIL_LOADING)
    expect(appDetailLoading(true).data).toEqual(true)
  })

  it('should create a appDetailReceiveData action', () => {
    expect(appDetailReceiveData.type).toEqual(ActionTypes.APP_DETAIL_RECEIVE_DATA)
    expect(appDetailReceiveData(appDetailDataStub).data).toEqual(appDetailDataStub)
  })

  it('should create a appDetailRequestData action', () => {
    expect(appDetailRequestData.type).toEqual(ActionTypes.APP_DETAIL_REQUEST_DATA)
    expect(appDetailRequestData('xxxx').data).toEqual('xxxx')
  })

  it('should create a appDetailClearData action', () => {
    expect(appDetailClearData.type).toEqual(ActionTypes.APP_DETAIL_CLEAR_DATA)
    expect(appDetailClearData(null).data).toEqual(null)
  })

  it('should create a appDetailFailure action', () => {
    expect(appDetailFailure.type).toEqual(ActionTypes.APP_DETAIL_REQUEST_DATA_FAILURE)
  })
})
