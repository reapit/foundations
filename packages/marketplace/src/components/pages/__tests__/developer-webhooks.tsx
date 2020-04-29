import * as React from 'react'
import {
  DeveloperWebhooksProps,
  handleSubscriptionChange,
  mapDispatchToProps,
  mapStateToProps,
  mapDeveloperAppsToAppSelectBoxOptions,
  DeveloperWebhooks,
} from '../developer-webhooks'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { WebhookSubscriptionsState, WebhookTopicsState } from '@/reducers/webhook-subscriptions'

import { developerState } from '@/sagas/__stubs__/developer'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { SelectBoxOptions } from '@reapit/elements'

const props: DeveloperWebhooksProps = {
  subscriptions: [],
  subscriptionsLoading: false,
  topics: [],
  applicationId: '',
  setApplicationId: jest.fn(),
  applications: [],
  fetchTopics: jest.fn(),
  developerState,
}

describe('DeveloperWebHooks', () => {
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
            applicationId: '',
            loading: false,
            error: false,
            topics: {
              _embedded: [],
            },
          } as WebhookTopicsState,
        },
        developer: developerState,
      } as ReduxState

      const output = {
        applicationId: '',
        subscriptions: [],
        applications: input.developer.developerData?.data.data,
        subscriptionsLoading: false,
        topics: [],
        developerState: input.developer,
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(output)
    })
  })
  describe('mapDeveloperAppsToAppSelectBoxOptions', () => {
    it('should return correctly', () => {
      const inputs: AppSummaryModel[] = [
        { name: '1', id: 'id1' },
        { name: '2', id: 'id2' },
      ]

      const outputs: SelectBoxOptions[] = [
        { label: '1', value: 'id1' },
        { label: '2', value: 'id2' },
      ]

      expect(mapDeveloperAppsToAppSelectBoxOptions(inputs)).toEqual(outputs)
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
