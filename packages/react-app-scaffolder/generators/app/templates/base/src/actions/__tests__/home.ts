import { homeRequestData, homeReceiveData, homeRequestDataFailure, homeLoading, homeClearData } from '../home'
import ActionTypes from '../../constants/action-types'

describe('error actions', () => {
  it('should create correct actions', () => {
    expect(homeRequestData.type).toEqual(ActionTypes.HOME_REQUEST_DATA)
    expect(homeReceiveData.type).toEqual(ActionTypes.HOME_RECEIVE_DATA)
    expect(homeRequestDataFailure.type).toEqual(ActionTypes.HOME_REQUEST_FAILURE)
    expect(homeLoading.type).toEqual(ActionTypes.HOME_LOADING)
    expect(homeClearData.type).toEqual(ActionTypes.HOME_CLEAR_DATA)
  })
})
