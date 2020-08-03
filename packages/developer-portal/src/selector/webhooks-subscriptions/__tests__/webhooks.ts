import { ReduxState } from '@/types/core'
import { selectSubscriptionsData, selectSubscriptionsLoading } from '../webhooks-subscriptions'
import { subscriptions } from '@/sagas/__stubs__/webhooks'

const input = {
  webhooksSubscriptions: {
    list: {
      isLoading: false,
      errorMessage: '',
      ...subscriptions,
    },
  },
} as ReduxState

describe('selectWebhooks', () => {
  it('should run correctly selectSubscriptionsData', () => {
    const result = selectSubscriptionsData(input)
    expect(result).toEqual(subscriptions._embedded)
  })

  it('should run correctly selectSubscriptionsLoading', () => {
    const result = selectSubscriptionsLoading(input)
    expect(result).toEqual(false)
  })
})
