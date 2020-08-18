import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import appState from '@/reducers/__stubs__/app-state'
import customersListReducer, { defaultState } from '../list'

const mockData = appState.customers.list

describe('currentMember reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = customersListReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading when fetch', () => {
    const newState = customersListReducer(undefined, {
      type: ActionTypes.FETCH_CUSTOMERS_LIST as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false & data when success', () => {
    const newState = customersListReducer(undefined, {
      type: ActionTypes.FETCH_CUSTOMERS_LIST_SUCCES as ActionType,
      data: mockData.data,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      data: mockData.data,
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false & errorMessage when failed update', () => {
    const newState = customersListReducer(undefined, {
      type: ActionTypes.FETCH_CUSTOMERS_LIST_FAILED as ActionType,
      data: 'error',
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'error',
    }
    expect(newState).toEqual(expected)
  })
})
