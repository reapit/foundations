import {
  developerLoading,
  developerReceiveData,
  developerRequestData,
  developerClearData,
  developerCreate,
  developerSetFormState,
  fetchBilling,
  fetchBillingSuccess,
  fetchBillingFailure,
  fetchMonthlyBilling,
  fetchMonthlyBillingSuccess,
  fetchMonthlyBillingFailure,
} from '../developer'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'
import { billing } from '@/sagas/__stubs__/billing'
import { monthlyBillingData } from '@/sagas/__stubs__/monthly-billing'

describe('developer actions', () => {
  it('should create a developerLoading action', () => {
    expect(developerLoading.type).toEqual(ActionTypes.DEVELOPER_LOADING)
    expect(developerLoading(true).data).toEqual(true)
  })

  it('should create a developerReceiveData action', () => {
    expect(developerReceiveData.type).toEqual(ActionTypes.DEVELOPER_RECEIVE_DATA)
    expect(developerReceiveData({ ...appsDataStub, scopes: appPermissionStub }).data).toEqual({
      ...appsDataStub,
      scopes: appPermissionStub,
    })
  })

  it('should create a developerRequestData action', () => {
    expect(developerRequestData.type).toEqual(ActionTypes.DEVELOPER_REQUEST_DATA)
    expect(developerRequestData({ page: 1 }).data).toEqual({ page: 1 })
  })

  it('should create a developerClearData action', () => {
    expect(developerClearData.type).toEqual(ActionTypes.DEVELOPER_CLEAR_DATA)
    expect(developerClearData(null).data).toEqual(null)
  })

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
    expect(fetchBilling({ dateFrom: '2020-01', dateTo: '2020-05', applicationId: ['123'] }).data).toEqual({
      dateFrom: '2020-01',
      dateTo: '2020-05',
      applicationId: ['123'],
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
})
