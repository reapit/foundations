import appDetailModalReducer, { defaultState } from '../app-detail-modal'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appDetailDataStub } from '../../sagas/__stubs__/app-detail'

describe('app-detail modal reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appDetailModalReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when SET_APP_DETAIL_MODAL_STATE_BROWSE action is called', () => {
    const newState = appDetailModalReducer(undefined, {
      type: ActionTypes.SET_APP_DETAIL_MODAL_STATE_BROWSE as ActionType,
      data: true,
    })
    const expected = 'VIEW_DETAIL_BROWSE'
    expect(newState).toEqual(expected)
  })

  it('should set app-detail item data when SET_APP_DETAIL_MODAL_STATE_INSTALL action is called', () => {
    const newState = appDetailModalReducer(undefined, {
      type: ActionTypes.SET_APP_DETAIL_MODAL_STATE_INSTALL as ActionType,
      data: appDetailDataStub,
    })
    const expected = 'VIEW_CONFIRM_INSTALL'
    expect(newState).toEqual(expected)
  })

  it('should set app-detail item data when SET_APP_DETAIL_MODAL_STATE_SUCCESS action is called', () => {
    const newState = appDetailModalReducer(undefined, {
      type: ActionTypes.SET_APP_DETAIL_MODAL_STATE_SUCCESS as ActionType,
      data: true,
    })
    const expected = 'VIEW_DETAIL_ACTION_SUCCESS'
    expect(newState).toEqual(expected)
  })
})
