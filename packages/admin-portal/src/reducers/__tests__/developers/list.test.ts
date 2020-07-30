import developersReducer, { defaultState as developerReducerDefaultState } from '../../developers'
import { defaultState as developerListState } from '../../developers/list'

import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { developerStub } from '@/sagas/developers/__stubs__/developer'

describe('developersReducer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = developersReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(developerReducerDefaultState)
  })

  it('should set loading to true when DEVS_MANAGEMENT_LOADING action is called', () => {
    const newState = developersReducer(undefined, {
      type: ActionTypes.DEVS_MANAGEMENT_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...developerReducerDefaultState,
      list: { ...developerListState, isLoading: true },
    }
    expect(newState).toEqual(expected)
  })

  it('should set developer list data and loading to false when DEVS_MANAGEMENT_RECEIVE_DATA action is called', () => {
    const newState = developersReducer(
      {
        ...developerReducerDefaultState,
        list: {
          ...developerListState,
          isLoading: true,
        },
      },
      {
        type: ActionTypes.DEVS_MANAGEMENT_RECEIVE_DATA as ActionType,
        data: {
          ...developerStub,
          pageNumber: 1,
          pageSize: 10,
          pageCount: 10,
          totalCount: 69,
        },
      },
    )
    const expected = {
      ...developerReducerDefaultState,
      list: {
        ...developerListState,
        ...developerStub,
        isLoading: false,
        pageNumber: 1,
        pageSize: 10,
        pageCount: 10,
        totalCount: 69,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false when DEVS_MANAGEMENT_REQUEST_FAILURE action is called', () => {
    const newState = developersReducer(
      {
        ...developerReducerDefaultState,
        list: {
          ...developerListState,
          isLoading: true,
        },
      },
      {
        type: ActionTypes.DEVS_MANAGEMENT_REQUEST_FAILURE as ActionType,
        data: null,
      },
    )
    const expected = {
      ...developerReducerDefaultState,
      list: { ...developerListState, isLoading: false },
    }
    expect(newState).toEqual(expected)
  })
})
