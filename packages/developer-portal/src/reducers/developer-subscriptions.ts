import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  developerFetchSubscriptions,
  developerFetchSubscriptionsSuccess,
  developerCreateSubscription,
  developerCreateSubscriptionSuccess,
  developerCreateSubscriptionFalure,
  developerCreateSubscriptionClearError,
} from '@/actions/developer-subscriptions'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'

export type DeveloperSubscriptionsState = {
  create: CreateDeveloperSubscriptionsState
  list: ListDeveloperSubscriptionsState
}

export type CreateDeveloperSubscriptionsState = {
  isLoading: boolean
  error: boolean
}

export type ListDeveloperSubscriptionsState = {
  data: SubscriptionModelPagedResult | null
  isLoading: boolean
}

export const defaultState: DeveloperSubscriptionsState = {
  create: {
    isLoading: false,
    error: false,
  },
  list: {
    isLoading: false,
    data: null,
  },
}

const developerSubscriptionsReducer = (
  state: DeveloperSubscriptionsState = defaultState,
  action: Action<any>,
): DeveloperSubscriptionsState => {
  if (isType(action, developerCreateSubscription)) {
    return {
      ...state,
      create: {
        isLoading: true,
        error: false,
      },
    }
  }

  if (isType(action, developerCreateSubscriptionSuccess)) {
    return {
      ...state,
      create: {
        isLoading: false,
        error: false,
      },
    }
  }

  if (isType(action, developerCreateSubscriptionFalure)) {
    return {
      ...state,
      create: {
        isLoading: false,
        error: true,
      },
    }
  }

  if (isType(action, developerCreateSubscriptionClearError)) {
    return {
      ...state,
      create: {
        ...state.create,
        error: false,
      },
    }
  }

  if (isType(action, developerFetchSubscriptions)) {
    return {
      ...state,
      list: {
        ...state.list,
        isLoading: true,
      },
    }
  }

  if (isType(action, developerFetchSubscriptionsSuccess)) {
    const { data = null } = action
    return {
      ...state,
      list: {
        isLoading: false,
        data,
      },
    }
  }

  return state
}

export default developerSubscriptionsReducer
