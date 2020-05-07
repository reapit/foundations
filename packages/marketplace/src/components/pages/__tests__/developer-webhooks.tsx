import * as React from 'react'
import {
  DeveloperWebhooksProps,
  handleSubscriptionChange,
  mapDispatchToProps,
  mapStateToProps,
  mapDeveloperAppsToAppSelectBoxOptions,
  DeveloperWebhooks,
  renderCustomerName,
  renderTopicName,
  openEditModal,
  MODAL_TYPE,
  openCreateModal,
} from '../developer-webhooks'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { WebhookSubscriptionsState, WebhookTopicsState, TopicModel } from '@/reducers/webhook-subscriptions'

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
  fetchSubscriptions: jest.fn(),
  developerState,
  modalType: '',
  webhookSetOpenModal: jest.fn(),
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
        webhookEdit: {
          modalType: '',
        },
      } as ReduxState

      const output = {
        applicationId: '',
        subscriptions: [],
        applications: input.developer.developerData?.data.data,
        subscriptionsLoading: false,
        topics: [],
        developerState: input.developer,
        modalType: '',
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
      const { fetchTopics, fetchSubscriptions, setApplicationId, webhookSetOpenModal } = mapDispatchToProps(
        mockDispatch,
      )
      fetchSubscriptions('applicationId')
      fetchTopics('applicationId')
      setApplicationId('applicationId')
      webhookSetOpenModal('applicationId')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('handleSubscriptionChange', () => {
    it('should run correctly', () => {
      const fetchTopics = jest.fn()
      const fetchSubscriptions = jest.fn()
      const values = { applicationId: '123' }
      handleSubscriptionChange({ fetchTopics, fetchSubscriptions })(values)
      expect(fetchTopics).toHaveBeenCalledWith(values.applicationId)
      expect(fetchSubscriptions).toHaveBeenCalledWith(values.applicationId)
    })
  })
  describe('renderTopicName', () => {
    it('should run correctly', () => {
      const topics: TopicModel[] = [
        {
          id: 'XXX',
          created: '',
          modified: '',
          name: 'xxx',
          description: '',
          url: '',
          active: false,
          associatedScope: '',
          example: '',
        },
        {
          id: 'YYY',
          created: '',
          modified: '',
          name: 'yyy',
          description: '',
          url: '',
          active: false,
          associatedScope: '',
          example: '',
        },
      ]
      const subscriptionTopicIds: string[] = ['XXX', 'YYY']
      const result = renderTopicName(topics, subscriptionTopicIds)
      const expected = 'xxx\nyyy'
      expect(result).toEqual(expected)
    })
  })
  describe('renderCustomerName', () => {
    it('should run correctly', () => {
      const subscriptionCustomerIds = ['XXX', 'yyy']
      const subscriptionCustomerIdsEmpty = []
      const result = renderCustomerName(subscriptionCustomerIds)
      const expected = 'XXX\nyyy'
      expect(result).toEqual(expected)

      const emptyResult = renderCustomerName(subscriptionCustomerIdsEmpty)
      expect(emptyResult).toEqual('All Customers (*)')
    })
  })
  describe('openEditModal', () => {
    it('should run correctly', () => {
      const webhookSetOpenModal = jest.fn()
      const setWebhookId = jest.fn()
      const webhookId = 'webhookId'

      openEditModal({ webhookSetOpenModal, setWebhookId })(webhookId)
      expect(webhookSetOpenModal).toBeCalledWith(MODAL_TYPE.EDIT)
      expect(setWebhookId).toBeCalledWith(webhookId)
    })
  })
  describe('openCreateModal', () => {
    it('should run correctly', () => {
      const webhookSetOpenModal = jest.fn()

      openCreateModal(webhookSetOpenModal)()
      expect(webhookSetOpenModal).toBeCalledWith(MODAL_TYPE.CREATE)
    })
  })
})
