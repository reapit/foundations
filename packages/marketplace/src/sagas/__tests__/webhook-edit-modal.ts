import developerWebhookSagas, {
  requestSupcriptionData,
  requestWebhookData,
  fetchWebhookSubscriptionTopics,
  fetchWebhookSubscriptionCustomers,
  fetchWebhookData,
  createWebhookListen,
  editWebhookListen,
  requestWebhookSupcriptionDataListen,
  requestWebhookDataListen,
} from '../webhook-edit-modal'
import { call, put, all, fork } from '@redux-saga/core/effects'
import {
  requestWebhookSubcriptionReceiveData,
  webhookEditLoading,
  requestWebhookReceiveData,
  requestWebhookReceiveDataFailure,
  requestWebhookSubcriptionReceiveFailure,
} from '@/actions/webhook-edit-modal'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { initAuthorizedRequestHeaders } from '@/constants/api'
import { webhookDataStub, webhookItemDataStub } from '../__stubs__/webhook-edit'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '../../../../elements/src/utils/validators/error-messages'
import { setApplicationId } from '@/actions/webhook-subscriptions'

jest.mock('@reapit/elements')
const ApplicationId = '1161242a-f650-4d1d-aed7-909853fe7ee1'
const params = { data: ApplicationId }
const mockHeaders = {
  Authorization: '123',
}
describe('developer fetch subscription data', () => {
  const gen = cloneableGenerator(requestSupcriptionData as any)(params)
  expect(gen.next().value).toEqual(put(webhookEditLoading(true)))
  expect(gen.next().value).toEqual(put(setApplicationId(ApplicationId)))

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

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next([undefined, undefined]).value).toEqual(put(requestWebhookSubcriptionReceiveFailure()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('developer fetch webhook data', () => {
  const webhookId = '1161242a-f650-4d1d-aed7-909853fe7ee1'
  const gen = cloneableGenerator(requestWebhookData as any)({ data: webhookId })
  expect(gen.next().value).toEqual(put(webhookEditLoading(true)))
  const header = gen.next().value
  expect(header).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(call(fetchWebhookData, { webhookId, headers: mockHeaders }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(webhookItemDataStub as any).value).toEqual(put(requestWebhookReceiveData(webhookItemDataStub)))
  })
  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(requestWebhookReceiveDataFailure()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('developerWebhookSagas', () => {
  it('should listen request data', () => {
    const gen = developerWebhookSagas()

    expect(gen.next().value).toEqual(
      all([
        fork(requestWebhookSupcriptionDataListen),
        fork(createWebhookListen),
        fork(editWebhookListen),
        fork(requestWebhookDataListen),
      ]),
    )
    expect(gen.next().done).toBe(true)
  })
})
