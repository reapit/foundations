import React from 'react'
import { shallow } from 'enzyme'
import {
  generateTopicOptions,
  fetchWebhookData,
  handleSubmitForm,
  closeResultModal,
  WebhookTestResultModal,
  WebhookTestModalProps,
  WebhookTestModal,
  GenerateTopicOptions,
} from '../webhook-test-modal'
import { ReduxState } from '@/types/core'
import * as ReactRedux from 'react-redux'
import { developerState } from '@/sagas/__stubs__/developer'
import configureStore from 'redux-mock-store'
import { TopicItem } from '@/reducers/webhook-edit-modal'
import { requestWebhookData } from '@/actions/webhook-edit-modal'
import { developerWebhookPing, developerSetWebhookPingStatus } from '@/actions/developer'

const mockState = {
  developer: developerState,
} as ReduxState

const props: WebhookTestModalProps = {
  visible: true,
  afterClose: jest.fn(),
  webhookId: 'webhookId',
  closeModal: jest.fn(),
}

describe('WebhookTestModal', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
    /* mocking useDispatch on our mock store  */
    // spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should WebhookTestModal match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <WebhookTestModal {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should WebhookTestResultModal match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <WebhookTestResultModal />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('generateTopicOptions', () => {
    it('should run correctly', () => {
      const params: GenerateTopicOptions = {
        topics: [
          {
            id: 'a',
            name: 'A',
          } as TopicItem,
        ],
        subcriptionTopicIds: ['a'],
      }
      const result = generateTopicOptions(params)
      const expected = [
        {
          value: 'a',
          label: 'A',
          description: 'A',
        },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('fetchWebhookData', () => {
    it('should run correctly', () => {
      const dispatch = jest.fn()
      const webhookId = 'webhookId'
      const fn = fetchWebhookData(dispatch, webhookId)
      fn()
      expect(dispatch).toBeCalledWith(requestWebhookData(webhookId))
    })
  })
  describe('handleSubmitForm', () => {
    it('should run correctly', () => {
      const dispatch = jest.fn()
      const webhookId = 'webhookId'
      const topicId = 'topicId'

      const fn = handleSubmitForm({ dispatch, webhookId })
      fn({ topicId })
      const params = {
        id: webhookId,
        topicId: topicId,
      }
      expect(dispatch).toBeCalledWith(developerWebhookPing(params))
    })
  })
  describe('closeResultModal', () => {
    it('should run correctly', () => {
      const dispatch = jest.fn()
      const fn = closeResultModal(dispatch)
      fn()
      expect(dispatch).toBeCalledWith(developerSetWebhookPingStatus(null))
    })
  })
})
