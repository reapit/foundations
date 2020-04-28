import * as React from 'react'

import {
  DeveloperWebhooks,
  DeveloperWebhooksProps,
  handleSubscriptionChange,
  mapStateToProps,
  mapDispatchToProps,
} from '../developer-webhooks'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { WebhookSubscriptionsState, WebhookTopicsState } from '@/reducers/webhook-subscriptions'

const props: DeveloperWebhooksProps = {
  subscriptions: [],
  subscriptionsLoading: false,
  topics: [],
  topicsLoading: false,
  fetchTopics: jest.fn(),
}

describe('DeveloperWebHooks', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperWebhooks {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(shallow(<DeveloperWebhooks {...props} />)).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const input = {
        webhooks: {
          subscriptions: {
            loading: false,
            error: false,
            subscriptions: {
              _embedded: [],
            },
          } as WebhookSubscriptionsState,
          topics: {
            loading: false,
            error: false,
            topics: {
              _embedded: [],
            },
          } as WebhookTopicsState,
        },
      } as ReduxState

      const output = {
        subscriptions: [],
        subscriptionsLoading: false,
        topics: [],
        topicsLoading: false,
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch correctly', () => {
      const mockDispatch = jest.fn()
      const { fetchTopics } = mapDispatchToProps(mockDispatch)
      fetchTopics('applicationId')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('handleSubscriptionChange', () => {
    it('should run correctly', () => {
      const fetchTopics = jest.fn()
      const values = { subscriptions: '123' }
      handleSubscriptionChange(fetchTopics)(values)
      expect(fetchTopics).toHaveBeenCalledWith(values.subscriptions)
    })
  })

  describe('getTableTopicsData', () => {
    it('should run correctly', () => {
      const fetchTopics = jest.fn()
      const values = { subscriptions: '123' }
      handleSubscriptionChange(fetchTopics)(values)
      expect(fetchTopics).toHaveBeenCalledWith(values.subscriptions)
    })
  })
})
