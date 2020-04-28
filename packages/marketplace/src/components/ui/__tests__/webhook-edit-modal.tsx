import * as React from 'react'
import { shallow } from 'enzyme'
import WebhookCreateModal, {
  WebhookModalInner,
  WebhookEditProps,
  onEdit,
  onCreate,
  WebhookModalInnerProps,
  mapDispatchToProps,
} from '../webhook-edit-modal'
import { webhookDataStub } from '@/sagas/__stubs__/webhook-edit'

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
  isUpdate: true,
  closeModal: jest.fn(),
  requestWebhookSubcriptionData: jest.fn(),
  requestWebhookData: jest.fn(),
  createWebhook: jest.fn(),
  editWebhook: jest.fn(),
  webhookEdit: webhookDataStub,
}

describe('WebhookEditProps', () => {
  it('should match a snapshot', () => {
    expect(shallow(<WebhookCreateModal {...createProps} />)).toMatchSnapshot()
    expect(shallow(<WebhookCreateModal {...editProps} />)).toMatchSnapshot()
    expect(shallow(<WebhookModalInner {...innerModalProps} />)).toMatchSnapshot()
  })

  it('should call editWebhook', () => {
    const editWebhook = jest.fn()
    const webhookId = ''
    const fn = onEdit(editWebhook, webhookId)
    const values = {
      url: '',
      description: '',
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
      description: '',
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
      const { requestWebhookSubcriptionData, createWebhook, editWebhook, requestWebhookData } = mapDispatchToProps(
        mockDispatch,
      )
      requestWebhookSubcriptionData('1')
      requestWebhookData('1')
      const values = {
        ApplicationId: '',
        url: '',
        description: '',
        topicIds: [],
        customerIds: [],
        active: false,
        webhookId: '',
      }
      createWebhook(values)
      editWebhook(values)
      expect(mockDispatch).toBeCalled()
    })
  })
})
