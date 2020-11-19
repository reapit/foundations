import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  fetchSubscriptionListSuccess,
  fetchSubscriptionListFailed,
  fetchSubscriptionList,
  cancelSubscription,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailed,
} from '../../actions/subscriptions'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type SubscriptionListState = SubscriptionModelPagedResult &
  Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'> & {
    cancelSubscription: {
      isLoading: boolean
    }
  }

export const defaultState: SubscriptionListState = {
  ...getDefaultFetchListValue(),
  cancelSubscription: {
    isLoading: false,
  },
}

const subscriptionsListReducer = (
  state: SubscriptionListState = defaultState,
  action: Action<any>,
): SubscriptionListState => {
  if (isType(action, fetchSubscriptionList)) {
    return { ...state, isLoading: true }
  }

  if (isType(action, fetchSubscriptionListSuccess)) {
    return {
      ...state,
      isLoading: false,
      ...(action.data || {}),
    }
  }

  if (isType(action, fetchSubscriptionListFailed)) {
    return { ...state, isLoading: false, errorMessage: action.data }
  }

  if (isType(action, cancelSubscription)) {
    return {
      ...state,
      cancelSubscription: {
        isLoading: true,
      },
    }
  }

  if (isType(action, cancelSubscriptionSuccess) || isType(action, cancelSubscriptionFailed)) {
    return {
      ...state,
      cancelSubscription: {
        isLoading: false,
      },
    }
  }

  return state
}

export default subscriptionsListReducer
