import developersReducer, { defaultState as developerReducerDefaultState } from '../../developers'
import { defaultState as developerListState } from '../../developers/list'

import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { developerStub } from '@/sagas/developers/__stubs__/developer'
import { errorMessages } from '@reapit/utils'

describe('developersReducer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = developersReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(developerReducerDefaultState)
  })

  it('should set loading to true when FETCH_DEVELOPER_LIST action is called', () => {
    const newState = developersReducer(undefined, {
      type: ActionTypes.FETCH_DEVELOPER_LIST as ActionType,
      data: true,
    })
    const expected = {
      ...developerReducerDefaultState,
      list: { ...developerListState, isLoading: true },
    }
    expect(newState).toEqual(expected)
  })

  it('should set developer list data and loading to false when FETCH_DEVELOPER_LIST_SUCCESS action is called', () => {
    const newState = developersReducer(
      {
        ...developerReducerDefaultState,
        list: {
          ...developerListState,
          isLoading: true,
        },
      },
      {
        type: ActionTypes.FETCH_DEVELOPER_LIST_SUCCESS as ActionType,
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

  it('should set loading to false when FETCH_DEVELOPER_LIST_FAILED action is called', () => {
    const newState = developersReducer(
      {
        ...developerReducerDefaultState,
        list: {
          ...developerListState,
          isLoading: true,
        },
      },
      {
        type: ActionTypes.FETCH_DEVELOPER_LIST_FAILED as ActionType,
        data: errorMessages.DEFAULT_SERVER_ERROR,
      },
    )
    const expected = {
      ...developerReducerDefaultState,
      list: { ...developerListState, isLoading: false, errorMessage: errorMessages.DEFAULT_SERVER_ERROR },
    }
    expect(newState).toEqual(expected)
  })
})
