// TODO: WILL MOVE ALL DEVELOPER ACTIONS TO HERE
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { WebhookPingTestStatus } from '@/reducers/developer'
import {
  CreateDeveloperModel,
  DeveloperModel,
  BillingBreakdownForMonthV2Model,
  BillingOverviewForPeriodV2Model,
} from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'
import { FetchBillingsParams, FetchBillingsByMonthParams } from '@/services/traffic-events'
import { PingWebhooksByIdParams } from '@/services/webhooks'
export const developerCreate = actionCreator<CreateDeveloperModel>(ActionTypes.DEVELOPER_CREATE)
export const developerSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SET_FORM_STATE)
export const fetchMyIdentity = actionCreator<void>(ActionTypes.DEVELOPER_FETCH_MY_IDENTITY)
export const setMyIdentity = actionCreator<DeveloperModel>(ActionTypes.DEVELOPER_SET_MY_IDENTITY)
export const fetchBilling = actionCreator<FetchBillingsParams>(ActionTypes.DEVELOPER_FETCH_BILLING)
export const fetchBillingSuccess = actionCreator<BillingOverviewForPeriodV2Model>(
  ActionTypes.DEVELOPER_FETCH_BILLING_SUCCESS,
)
export const fetchBillingFailure = actionCreator<unknown>(ActionTypes.DEVELOPER_FETCH_BILLING_FAILED)
export const fetchMonthlyBilling = actionCreator<FetchBillingsByMonthParams>(
  ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING,
)
export const fetchMonthlyBillingSuccess = actionCreator<BillingBreakdownForMonthV2Model>(
  ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING_SUCCESS,
)
export const fetchMonthlyBillingFailure = actionCreator<unknown>(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING_FAILED)
export const developerWebhookPing = actionCreator<PingWebhooksByIdParams>(ActionTypes.DEVELOPER_PING_WEBHOOK)
export const developerSetWebhookPingStatus = actionCreator<WebhookPingTestStatus>(
  ActionTypes.DEVELOPER_SET_PING_WEBHOOK_STATUS,
)
