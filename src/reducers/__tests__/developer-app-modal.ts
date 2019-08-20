import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import {
  setDeveloperAppModalStateDelete,
  setDeveloperAppModalStateViewDetail,
  setDeveloperAppModalStateEditDetail
} from '@/actions/developer-app-modal'
import appDeveloperModalReducer, { defaultState } from '@/reducers/developer-app-modal'

describe('developer app modal reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appDeveloperModalReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return "VIEW_DETAIL" if setDeveloperAppModalStateViewDetail is dispatched', () => {
    const newState = appDeveloperModalReducer(undefined, setDeveloperAppModalStateViewDetail())
    expect(newState).toEqual('VIEW_DETAIL')
  })
  it('should return "EDIT_APP_DETAIL" if setDeveloperAppModalStateEditDetail is dispatched', () => {
    const newState = appDeveloperModalReducer(undefined, setDeveloperAppModalStateEditDetail())
    expect(newState).toEqual('EDIT_APP_DETAIL')
  })
  it('should return "DELETE_APP_CONFIRM" if setDeveloperAppModalStateEditDetail is dispatched', () => {
    const newState = appDeveloperModalReducer(undefined, setDeveloperAppModalStateDelete())
    expect(newState).toEqual('DELETE_APP_CONFIRM')
  })
})
