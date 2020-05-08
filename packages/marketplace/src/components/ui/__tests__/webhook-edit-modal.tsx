import * as React from 'react'
import { shallow } from 'enzyme'
import WebhookCreateModal, {
  WebhookModalInner,
  WebhookEditProps,
  onEdit,
  onCreate,
  WebhookModalInnerProps,
  mapDispatchToProps,
  generateCustomerOptions,
  generateTopicOptions,
  FormValuesType,
} from '../webhook-edit-modal'
import { webhookItemDataStub } from '@/sagas/__stubs__/webhook-edit'
import { TopicItem, CustomerItem } from '@/reducers/webhook-edit-modal'

const createProps: WebhookEditProps = {
  appId: '',
  visible: true,
}
const editProps: WebhookEditProps = {
  appId: '',
  visible: true,
  isUpdate: true,
}

const innerModalProps: WebhookModalInnerProps = {
  appId: '',
  topics: [],
  customers: [],
  loading: false,
  isUpdate: true,
  closeModal: jest.fn(),
  requestWebhookSubcriptionData: jest.fn(),
  requestWebhookData: jest.fn(),
  createWebhook: jest.fn(),
  editWebhook: jest.fn(),
  deleteWebhook: jest.fn(),
  webhookDataClear: jest.fn(),
  webhookData: webhookItemDataStub,
}

describe('WebhookEditModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<WebhookCreateModal {...createProps} />)).toMatchSnapshot()
    expect(shallow(<WebhookCreateModal {...editProps} />)).toMatchSnapshot()
    expect(shallow(<WebhookCreateModal {...createProps} visible={false} />)).toMatchSnapshot()
    expect(shallow(<WebhookCreateModal {...editProps} visible={false} />)).toMatchSnapshot()
    expect(shallow(<WebhookModalInner {...innerModalProps} />)).toMatchSnapshot()
  })

  it('should call editWebhook', () => {
    const editWebhook = jest.fn()
    const webhookId = ''
    const appId = ''
    const fn = onEdit(editWebhook, webhookId, appId)
    const values: FormValuesType = {
      url: '',
      topicIds: [],
      customerIds: [],
      active: false,
    }
    fn(values)
    expect(editWebhook).toBeCalled()
  })
  it('should call createWebhook', () => {
    const createWebhook = jest.fn()
    const webhookId = ''
    const fn = onCreate(createWebhook, webhookId)
    const values = {
      url: '',
      topicIds: [],
      customerIds: [],
      active: false,
    }
    fn(values)
    expect(createWebhook).toBeCalled()
  })
  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const {
        requestWebhookSubcriptionData,
        createWebhook,
        editWebhook,
        requestWebhookData,
        webhookDataClear,
        deleteWebhook,
      } = mapDispatchToProps(mockDispatch)
      requestWebhookSubcriptionData('1')
      requestWebhookData('1')
      const values = {
        applicationId: '',
        url: '',
        description: '',
        topicIds: [],
        customerIds: [],
        active: false,
        webhookId: '',
      }
      createWebhook(values)
      editWebhook(values)
      webhookDataClear()
      deleteWebhook(values)
      expect(mockDispatch).toBeCalled()
    })
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
