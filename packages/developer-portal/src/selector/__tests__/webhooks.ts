import { ReduxState } from '@/types/core'
import { selectSubscriptionsData, selectSubscriptionsLoading } from '../wehooks'
import { subscriptions } from '@/sagas/__stubs__/webhooks'

const input = {
  webhooks: {
    subscriptions: {
      loading: false,
      error: false,
      subscriptions,
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
