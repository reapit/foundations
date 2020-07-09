import adminDevManagementReducer, { defaultState } from '../admin-dev-management'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { developerStub } from '../../sagas/__stubs__/developer'

describe('admin dev management reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = adminDevManagementReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when ADMIN_DEV_MANAGEMENT_LOADING action is called', () => {
    const newState = adminDevManagementReducer(undefined, {
      type: ActionTypes.ADMIN_DEV_MANAGEMENT_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set admin dev management list data when ADMIN_DEV_MANAGEMENT_RECEIVE_DATA action is called', () => {
    const newState = adminDevManagementReducer(undefined, {
      type: ActionTypes.ADMIN_DEV_MANAGEMENT_RECEIVE_DATA as ActionType,
      data: {
        data: [developerStub],
        pageNumber: 1,
        pageSize: 10,
        pageCount: 10,
        totalCount: 69,
      },
    })
    const expected = {
      ...defaultState,
      data: {
        data: [developerStub],
        pageNumber: 1,
        pageSize: 10,
        pageCount: 10,
        totalCount: 69,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false when ADMIN_DEV_MANAGEMENT_REQUEST_FAILURE action is called', () => {
    const newState = adminDevManagementReducer(undefined, {
      type: ActionTypes.ADMIN_DEV_MANAGEMENT_REQUEST_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })
})
