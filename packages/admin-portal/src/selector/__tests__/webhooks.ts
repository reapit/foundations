import { ReduxState } from '@/types/core'
import { selectSubscriptionsData, selectSubscriptionsLoading, selectTopicsData, selectTopicsLoading } from '../wehooks'
import { subscriptions, topics } from '@/sagas/__stubs__/webhooks'

const input = {
  webhooks: {
    subscriptions: {
      loading: false,
      error: false,
      subscriptions,
    },
    topics: {
      loading: false,
      error: false,
      topics,
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

  it('should run correctly selectTopicsData', () => {
    const result = selectTopicsData(input)
    expect(result).toEqual(topics._embedded)
  })

  it('should run correctly selectTopicsLoading', () => {
    const result = selectTopicsLoading(input)
    expect(result).toEqual(false)
  })
})
