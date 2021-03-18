import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { subscriptionStub } from '../../../sagas/subscriptions/__stubs__'
import subscriptionsByDevAndTypeReducer, { defaultState } from '../../subscriptions/by-dev-and-type'

describe('subscriptionsByDevAndTypeReducer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = subscriptionsByDevAndTypeReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set unique subscription data to state', () => {
    const newState = subscriptionsByDevAndTypeReducer(
      {
        ...defaultState,
        subscriptions: [subscriptionStub],
      },
      {
        type: ActionTypes.FETCH_SUBSCRIPTIONS_BY_TYPE_AND_DEV_SUCCESS as ActionType,
        data: {
          ...subscriptionStub,
        },
      },
    )
    const expected = {
      subscriptions: [subscriptionStub],
    }
    expect(newState).toEqual(expected)
  })
})
