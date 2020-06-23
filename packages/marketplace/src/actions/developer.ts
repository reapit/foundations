// TODO: WILL MOVE ALL DEVELOPER ACTIONS TO HERE
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import {
  AppDetailData,
  DeveloperItem,
  DeveloperRequestParams,
  Billing,
  WebhookPingTestStatus,
} from '@/reducers/developer'
import {
  CreateDeveloperModel,
  DeveloperModel,
  BillingBreakdownForMonthV2Model,
} from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'
import { FetchBillingsParams, FetchBillingsByMonthParams } from '@/services/traffic-events'
import { PingWebhooksByIdParams } from '@/services/webhooks'
import { FetchAppByIdParams } from '@/services/apps'
import { FetchSubscriptionsListParams, SubscriptionsListResult } from '@/services/subscriptions'

// Developer App Detail
export const developerFetchAppDetail = actionCreator<FetchAppByIdParams>(ActionTypes.DEVELOPER_FETCH_APP_DETAIL)
export const developerFetchAppDetailSuccess = actionCreator<AppDetailData>(
  ActionTypes.DEVELOPER_FETCH_APP_DETAIL_SUCCESS,
)
export const developerFetchAppDetailFailed = actionCreator<string>(ActionTypes.DEVELOPER_FETCH_APP_DETAIL_FAILED)

export const developerRequestData = actionCreator<DeveloperRequestParams>(ActionTypes.DEVELOPER_REQUEST_DATA)
export const developerRequestDataFailure = actionCreator<void>(ActionTypes.DEVELOPER_REQUEST_DATA_FAILURE)
export const developerLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_LOADING)
export const developerReceiveData = actionCreator<DeveloperItem | undefined>(ActionTypes.DEVELOPER_RECEIVE_DATA)
export const developerClearData = actionCreator<null>(ActionTypes.DEVELOPER_CLEAR_DATA)
export const developerCreate = actionCreator<CreateDeveloperModel>(ActionTypes.DEVELOPER_CREATE)
export const developerSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SET_FORM_STATE)
export const fetchMyIdentity = actionCreator<void>(ActionTypes.DEVELOPER_FETCH_MY_IDENTITY)
export const setMyIdentity = actionCreator<DeveloperModel>(ActionTypes.DEVELOPER_SET_MY_IDENTITY)
export const fetchBilling = actionCreator<FetchBillingsParams>(ActionTypes.DEVELOPER_FETCH_BILLING)
export const fetchBillingSuccess = actionCreator<Billing>(ActionTypes.DEVELOPER_FETCH_BILLING_SUCCESS)
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
export const developerApplyAppDetails = actionCreator<AppDetailData>(ActionTypes.DEVELOPER_APPLY_APP_DETAIL)

export const developerFetchSubscriptions = actionCreator<FetchSubscriptionsListParams>(
  ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS,
)
export const developerFetchSubscriptionsSuccess = actionCreator<SubscriptionsListResult>(
  ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS_SUCCESS,
)
export const developerDeleteSubscription = actionCreator<string>(ActionTypes.DEVELOPER_DELETE_SUBSCRIPTION)
