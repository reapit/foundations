import { ReduxState } from '@/types/core'
import { webhookEditDataStub } from '@/sagas/__stubs__/webhook-edit'
import { selectCustomers, selectTopics, selectLoading, selectWebhookData } from '../webhook-edit'

const input = { webhookEdit: webhookEditDataStub } as ReduxState

describe('selectWebhookEdit', () => {
  it('should run correctly selectTopics', () => {
    const result = selectTopics(input)
    expect(result).toEqual(webhookEditDataStub.subcriptionTopics._embedded)
  })

  it('should run correctly selectCustomers', () => {
    const result = selectCustomers(input)
    expect(result).toEqual(webhookEditDataStub.subcriptionCustomers.data)
  })

  it('should run correctly selectLoading', () => {
    const result = selectLoading(input)
    expect(result).toEqual(webhookEditDataStub.loading)
  })

  it('should run correctly selectWebhookData', () => {
    const result = selectWebhookData(input)
    expect(result).toEqual(webhookEditDataStub.webhookData)
  })
})
