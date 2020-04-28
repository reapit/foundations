import {
  requestSupcriptionData,
  fetchWebhookSubscriptionTopics,
  fetchWebhookSubscriptionCustomers,
} from '../webhook-edit-modal'
import { call, put, all } from '@redux-saga/core/effects'
import { requestWebhookSubcriptionReceiveData, webhookEditLoading } from '@/actions/webhook-edit-modal'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { webhookDataStub } from '../__stubs__/developer-webhook'

jest.mock('@reapit/elements')
const ApplicationId = '1161242a-f650-4d1d-aed7-909853fe7ee1'
const params = { data: ApplicationId }
const mockHeaders = {
  Authorization: '123',
}
describe('developer fetch subscription data', () => {
  const gen = cloneableGenerator(requestSupcriptionData as any)(params)
  expect(gen.next().value).toEqual(put(webhookEditLoading(true)))
  const header = gen.next().value
  expect(header).toEqual(call(initAuthorizedRequestHeaders))

  expect(gen.next(mockHeaders as any).value).toEqual(
    all([
      call(fetchWebhookSubscriptionTopics, { ApplicationId, headers: mockHeaders }),
      call(fetchWebhookSubscriptionCustomers, { AppId: ApplicationId }),
    ]),
  )

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next([webhookDataStub.subcriptionTopics, webhookDataStub.subcriptionCustomers] as any).value).toEqual(
      put(requestWebhookSubcriptionReceiveData(webhookDataStub)),
    )
  })
})
