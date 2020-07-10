import * as React from 'react'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import WebhookCreateModal, {
  WebhookEditProps,
  onEdit,
  onCreate,
  generateCustomerOptions,
  generateTopicOptions,
  FormValuesType,
} from '../webhook-edit-modal'
import { TopicItem, CustomerItem } from '@/reducers/webhook-edit-modal'
import { editWebhook, createWebhook } from '@/actions/webhook-edit-modal'

const mockProps: WebhookEditProps = {
  appId: '',
  visible: true,
  isUpdate: true,
  afterClose: jest.fn(),
  closeModal: jest.fn(),
  webhookId: 'testWebhookId',
}

describe('WebhookEditModal', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <WebhookCreateModal {...mockProps} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should call editWebhook', () => {
    const webhookId = ''
    const appId = ''
    const fn = onEdit(spyDispatch, webhookId, appId)
    const values: FormValuesType = {
      url: '',
      topicIds: [],
      customerIds: [],
      active: false,
    }
    fn(values)
    expect(spyDispatch).toBeCalledWith(
      editWebhook({
        applicationId: appId,
        webhookId,
        url: values.url,
        description: '',
        topicIds: values.topicIds,
        customerIds: values.customerIds,
        active: values.active,
      }),
    )
  })
  it('should call createWebhook', () => {
    const appId = ''
    const fn = onCreate(spyDispatch, appId)
    const values = {
      url: '',
      topicIds: [],
      customerIds: [],
      active: false,
    }
    fn(values)
    expect(spyDispatch).toBeCalledWith(
      createWebhook({
        applicationId: appId,
        url: values.url,
        description: '',
        topicIds: values.topicIds,
        customerIds: values.customerIds,
        active: values.active,
      }),
    )
  })

  it('should return TopicItem Options', () => {
    const data: TopicItem[] = [
      {
        id: 'id',
        created: 'string',
        modified: false,
        name: 'string',
        description: 'string',
        url: 'string',
        active: true,
        example: 'string',
        associatedScope: 'string',
      },
      {
        id: 'id',
        created: 'string',
        modified: false,
        name: 'name',
        description: 'description',
        url: 'string',
        active: false,
        example: 'string',
        associatedScope: 'string',
      },
    ]

    const expected = [
      {
        value: 'id',
        label: 'string',
        description: 'string',
      },
      {
        value: 'id',
        label: 'name',
        description: 'description',
      },
    ]

    expect(generateTopicOptions(data)).toEqual(expected)
  })

  it('should return CustomerItem Options', () => {
    const data: CustomerItem[] = [
      {
        id: 'string',
        created: 'string',
        appId: 'string',
        client: 'client',
        status: 'Terminated',
        authFlow: '',
      },
      {
        id: 'id',
        created: 'string',
        appId: 'appId',
        client: 'client',
        status: 'Active',
        authFlow: '',
      },
    ]

    const expected = [
      {
        value: 'SBOX',
        label: 'SBOX',
        description: 'SBOX',
      },
      {
        value: 'client',
        label: 'client',
        description: 'client',
      },
    ]

    expect(generateCustomerOptions(data)).toEqual(expected)
  })
})
