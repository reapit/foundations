import {
  developerCreate,
  developerSetFormState,
  fetchBilling,
  fetchBillingSuccess,
  fetchBillingFailure,
  fetchMonthlyBilling,
  fetchMonthlyBillingSuccess,
  fetchMonthlyBillingFailure,
  developerWebhookPing,
  developerSetWebhookPingStatus,
} from '../developer'
import ActionTypes from '../../constants/action-types'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { billing } from '@/sagas/__stubs__/billing'
import { monthlyBillingData } from '@/sagas/__stubs__/monthly-billing'
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

  it('should create a fetchBilling action', () => {
    expect(fetchBilling.type).toEqual(ActionTypes.DEVELOPER_FETCH_BILLING)
    expect(fetchBilling({ dateFrom: '2020-01', dateTo: '2020-05', developerId: 'developerId' }).data).toEqual({
      dateFrom: '2020-01',
      dateTo: '2020-05',
      developerId: 'developerId',
    })
  })

  it('should create a fetchBillingFailure action', () => {
    expect(fetchBillingSuccess.type).toEqual(ActionTypes.DEVELOPER_FETCH_BILLING_SUCCESS)
    expect(fetchBillingSuccess(billing).data).toEqual(billing)
  })

  it('should create a fetchBillingFailure action', () => {
    expect(fetchBillingFailure.type).toEqual(ActionTypes.DEVELOPER_FETCH_BILLING_FAILED)
    expect(fetchBillingFailure('error').data).toEqual('error')
  })

  it('should create a fetchMonthlyBilling action', () => {
    const params = {
      applicationId: ['applicationId'],
      month: 'month',
    }
    expect(fetchMonthlyBilling.type).toEqual(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING)
    expect(fetchMonthlyBilling(params).data).toEqual(params)
  })

  it('should create a fetchMonthlyBillingSuccess action', () => {
    expect(fetchMonthlyBillingSuccess.type).toEqual(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING_SUCCESS)
    expect(fetchMonthlyBillingSuccess(monthlyBillingData).data).toEqual(monthlyBillingData)
  })

  it('should create a fetchMonthlyBillingFailure action', () => {
    expect(fetchMonthlyBillingFailure.type).toEqual(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING_FAILED)
    expect(fetchMonthlyBillingFailure('error').data).toEqual('error')
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
