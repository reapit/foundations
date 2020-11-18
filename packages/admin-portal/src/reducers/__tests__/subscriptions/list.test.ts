import subscriptionsReducer, { defaultState as subscriptionReducerDefaultState } from '../../subscriptions'
import { defaultState as subscriptionListState } from '../../subscriptions/list'

import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { subscriptionStub } from '@/sagas/subscriptions/__stubs__'
import { errorMessages } from '@reapit/utils'

describe('subscriptionsReducer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = subscriptionsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(subscriptionReducerDefaultState)
  })

  it('should set loading to true when FETCH_SUBSCRIPTION_LIST action is called', () => {
    const newState = subscriptionsReducer(undefined, {
      type: ActionTypes.FETCH_SUBSCRIPTION_LIST as ActionType,
      data: true,
    })
    const expected = {
      ...subscriptionReducerDefaultState,
      list: { ...subscriptionListState, isLoading: true },
    }
    expect(newState).toEqual(expected)
  })

  it('should set subscription list data and loading to false when FETCH_SUBSCRIPTION_LIST_SUCCESS action is called', () => {
    const newState = subscriptionsReducer(
      {
        ...subscriptionReducerDefaultState,
        list: {
          ...subscriptionListState,
          isLoading: true,
        },
      },
      {
        type: ActionTypes.FETCH_SUBSCRIPTION_LIST_SUCCESS as ActionType,
        data: {
          ...subscriptionStub,
          pageNumber: 1,
          pageSize: 12,
          pageCount: 10,
          totalCount: 60,
        },
      },
    )
    const expected = {
      ...subscriptionReducerDefaultState,
      list: {
        ...subscriptionListState,
        ...subscriptionStub,
        isLoading: false,
        pageNumber: 1,
        pageSize: 12,
        pageCount: 10,
        totalCount: 60,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false when FETCH_SUBSCRIPTION_LIST_FAILED action is called', () => {
    const newState = subscriptionsReducer(
      {
        ...subscriptionReducerDefaultState,
        list: {
          ...subscriptionListState,
          isLoading: true,
        },
      },
      {
        type: ActionTypes.FETCH_SUBSCRIPTION_LIST_FAILED as ActionType,
        data: errorMessages.DEFAULT_SERVER_ERROR,
      },
    )
    const expected = {
      ...subscriptionReducerDefaultState,
      list: { ...subscriptionListState, isLoading: false, errorMessage: errorMessages.DEFAULT_SERVER_ERROR },
    }
    expect(newState).toEqual(expected)
  })
})
