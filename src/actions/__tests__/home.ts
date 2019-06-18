import { homeLoading, homeReceiveData, homeRequestData, homeClearData } from '../home'
import ActionTypes from '../../constants/action-types'
import { homeDataStub } from '../../sagas/__stubs__/home'

describe('home actions', () => {
  it('should create a homeLoading action', () => {
    expect(homeLoading.type).toEqual(ActionTypes.HOME_LOADING)
    expect(homeLoading(true).data).toEqual(true)
  })

  it('should create a homeReceiveData action', () => {
    expect(homeReceiveData.type).toEqual(ActionTypes.HOME_RECEIVE_DATA)
    expect(homeReceiveData(homeDataStub).data).toEqual(homeDataStub)
  })

  it('should create a homeRequestData action', () => {
    expect(homeRequestData.type).toEqual(ActionTypes.HOME_REQUEST_DATA)
    expect(homeRequestData().data).toEqual(undefined)
  })

  it('should create a homeClearData action', () => {
    expect(homeClearData.type).toEqual(ActionTypes.HOME_CLEAR_DATA)
    expect(homeClearData(null).data).toEqual(null)
  })
})
