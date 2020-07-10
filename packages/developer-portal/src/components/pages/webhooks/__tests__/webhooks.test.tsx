import * as React from 'react'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import {
  handleSubscriptionChange,
  mapDeveloperAppsToAppSelectBoxOptions,
  DeveloperWebhooks,
  renderCustomerName,
  renderTopicName,
  openEditModal,
  MODAL_TYPE,
  openCreateModal,
  openTestModal,
} from '../webhooks'
import { mount } from 'enzyme'
import { TopicModel } from '@/reducers/webhook-subscriptions'

import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { SelectBoxOptions } from '@reapit/elements'
import appState from '@/reducers/__stubs__/app-state'
import { webhookSubscriptionsRequestData, webhookTopicsRequestData } from '@/actions/webhook-subscriptions'
import { webhookSetOpenModal } from '@/actions/webhook-edit-modal'

describe('DeveloperWebHooks', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <DeveloperWebhooks />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
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

  describe('handleSubscriptionChange', () => {
    it('should run correctly', () => {
      const values = { applicationId: '123' }
      handleSubscriptionChange(spyDispatch)(values)
      expect(spyDispatch).toHaveBeenCalledWith(webhookSubscriptionsRequestData(values.applicationId))
      expect(spyDispatch).toHaveBeenCalledWith(webhookTopicsRequestData(values.applicationId))
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
      const expected = ['xxx', 'yyy']
      expect(result).toEqual(expected)
    })
  })
  describe('renderCustomerName', () => {
    it('should run correctly', () => {
      const subscriptionCustomerIds = ['XXX', 'yyy']
      const subscriptionCustomerIdsEmpty = []
      const result = renderCustomerName(subscriptionCustomerIds)
      const expected = ['XXX', 'yyy']
      expect(result).toEqual(expected)

      const emptyResult = renderCustomerName(subscriptionCustomerIdsEmpty)
      expect(emptyResult).toEqual(['All Customers (*)'])
    })
  })
  describe('openEditModal', () => {
    it('should run correctly', () => {
      const setWebhookId = jest.fn()
      const webhookId = 'webhookId'

      openEditModal(spyDispatch, setWebhookId)(webhookId)
      expect(spyDispatch).toBeCalledWith(webhookSetOpenModal(MODAL_TYPE.EDIT))
      expect(setWebhookId).toBeCalledWith(webhookId)
    })
  })
  describe('openCreateModal', () => {
    it('should run correctly', () => {
      openCreateModal(spyDispatch)()
      expect(spyDispatch).toBeCalledWith(webhookSetOpenModal(MODAL_TYPE.CREATE))
    })
  })

  describe('openTestModal', () => {
    it('should run correctly', () => {
      const webhookId = 'webhookId'
      const setWebhookId = jest.fn()

      openTestModal(spyDispatch, setWebhookId)(webhookId)
      expect(spyDispatch).toBeCalledWith(webhookSetOpenModal(MODAL_TYPE.TEST))
    })
  })
})
