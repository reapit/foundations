import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { fetchSubscriptionsByTypeAndDevSuccess } from '../../actions/subscriptions'
import { SubscriptionModel } from '@reapit/foundations-ts-definitions'

export type SubscriptionsByDevAndTypeState = {
  subscriptions: SubscriptionModel[]
}

export const defaultState: SubscriptionsByDevAndTypeState = {
  subscriptions: [],
}

const subscriptionsByDevAndTypeReducer = (
  state: SubscriptionsByDevAndTypeState = defaultState,
  action: Action<any>,
): SubscriptionsByDevAndTypeState => {
  if (isType(action, fetchSubscriptionsByTypeAndDevSuccess)) {
    const newSubs = action?.data?.data ?? []
    const uniqueOldSubs = state.subscriptions.filter((sub) => !newSubs.find((newSub) => newSub.id === sub.id))
    const currentSubs = [...uniqueOldSubs, ...newSubs].filter((sub) => !sub.cancelled)

    return {
      ...state,
      subscriptions: currentSubs,
    }
  }

  return state
}

export default subscriptionsByDevAndTypeReducer
