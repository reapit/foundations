import {
  developerCreate,
  developerSetFormState,
  developerWebhookPing,
  developerSetWebhookPingStatus,
} from '../developer'
import ActionTypes from '../../constants/action-types'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { PingWebhooksByIdParams } from '@/services/webhooks'

describe('developer actions', () => {
  it('should create a developerCreate action', () => {
    const newDeveloper: CreateDeveloperModel = {
      name: 'Bob',
      companyName: 'Acme',
      email: 'bob@acme.com',
      telephone: '0123456789',
    }
    expect(developerCreate.type).toEqual(ActionTypes.DEVELOPER_CREATE)
    expect(developerCreate(newDeveloper).data).toEqual(newDeveloper)
  })

  it('should create a developerSetFormState action', () => {
    expect(developerSetFormState.type).toEqual(ActionTypes.DEVELOPER_SET_FORM_STATE)
    expect(developerSetFormState('DONE').data).toEqual('DONE')
  })

  it('should create a developerWebhookPing action', () => {
    const params: PingWebhooksByIdParams = {
      id: 'id',
      topicId: 'topicId',
    }
    expect(developerWebhookPing.type).toEqual(ActionTypes.DEVELOPER_PING_WEBHOOK)
    expect(developerWebhookPing(params).data).toEqual(params)
  })
  it('should create a developerSetWebhookPingStatus action', () => {
    expect(developerSetWebhookPingStatus.type).toEqual(ActionTypes.DEVELOPER_SET_PING_WEBHOOK_STATUS)
    expect(developerSetWebhookPingStatus('SUCCESS').data).toEqual('SUCCESS')
  })
})
