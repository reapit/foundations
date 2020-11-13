import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  fetchSubscriptionListSuccess,
  fetchSubscriptionListFailed,
  fetchSubscriptionList,
} from '../../actions/subscriptions'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type SubscriptionListState = SubscriptionModelPagedResult &
  Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export const defaultState: SubscriptionListState = getDefaultFetchListValue()

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

  return state
}

export default subscriptionsListReducer
