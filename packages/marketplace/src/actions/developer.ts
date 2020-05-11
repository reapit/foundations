// TODO: WILL MOVE ALL DEVELOPER ACTIONS TO HERE
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DeveloperItem, DeveloperRequestParams, Billing, MonthlyBilling } from '../reducers/developer'
import { CreateDeveloperModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'
import { FetchBillingParams } from '@/sagas/api'
import { FetchMonthlyBillingParams } from '@/services/billings'

export const developerRequestData = actionCreator<DeveloperRequestParams>(ActionTypes.DEVELOPER_REQUEST_DATA)
export const developerRequestDataFailure = actionCreator<void>(ActionTypes.DEVELOPER_REQUEST_DATA_FAILURE)
export const developerLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_LOADING)
export const developerReceiveData = actionCreator<DeveloperItem | undefined>(ActionTypes.DEVELOPER_RECEIVE_DATA)
export const developerClearData = actionCreator<null>(ActionTypes.DEVELOPER_CLEAR_DATA)
export const developerCreate = actionCreator<CreateDeveloperModel>(ActionTypes.DEVELOPER_CREATE)
export const developerSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SET_FORM_STATE)
export const fetchMyIdentity = actionCreator<void>(ActionTypes.DEVELOPER_FETCH_MY_IDENTITY)
export const setMyIdentity = actionCreator<DeveloperModel>(ActionTypes.DEVELOPER_SET_MY_IDENTITY)
export const fetchBilling = actionCreator<FetchBillingParams>(ActionTypes.DEVELOPER_FETCH_BILLING)
export const fetchBillingSuccess = actionCreator<Billing>(ActionTypes.DEVELOPER_FETCH_BILLING_SUCCESS)
export const fetchBillingFailure = actionCreator<unknown>(ActionTypes.DEVELOPER_FETCH_BILLING_FAILED)
export const fetchMonthlyBilling = actionCreator<FetchMonthlyBillingParams>(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING)
export const fetchMonthlyBillingSuccess = actionCreator<MonthlyBilling>(
  ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING_SUCCESS,
)
export const fetchMonthlyBillingFailure = actionCreator<unknown>(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING_FAILED)
