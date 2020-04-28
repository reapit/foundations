import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '../types/core'
import ActionTypes from '../constants/action-types'
import { DeveloperWebhookState } from '@/reducers/webhook-edit-modal'
import {
  webhookEditLoading,
  requestWebhookSubcriptionReceiveFailure,
  requestWebhookSubcriptionReceiveData,
  SubscriptionCustomersRequestParams,
  SubscriptionTopicsRequestParams,
  WebhookDataRequestParams,
  CreateWebhookParams,
  WebhookSubcriptionDataRequest,
} from '@/actions/webhook-edit-modal'
import { logger } from 'logger'
import errorMessages from '../constants/error-messages'
import { errorThrownServer } from '../actions/error'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'

export const fetchWebhookSubscriptionTopics = async (params: SubscriptionTopicsRequestParams) => {
  try {
    const { ApplicationId, headers } = params
    const response = await fetcher({
      url: `${URLS.webhook}/topics?${setQueryParams({ ApplicationId })}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchWebhookSubscriptionCustomers = async (params: SubscriptionCustomersRequestParams) => {
  try {
    const { AppId } = params
    const response = await fetcher({
      url: `${URLS.installations}?${setQueryParams({ AppId })}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchWebhookData = async (params: WebhookDataRequestParams) => {
  try {
    const { webhookId } = params
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhook}/subscriptions/${webhookId}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchCreateNewWebhook = async (params: CreateWebhookParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhook}/subscriptions`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: headers,
      body: params,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const requestSupcriptionData = function*({ data: ApplicationId }) {
  yield put(webhookEditLoading(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const [subcriptionTopics, subcriptionCustomers] = yield all([
      call(fetchWebhookSubscriptionTopics, { ApplicationId, headers }),
      call(fetchWebhookSubscriptionCustomers, { AppId: ApplicationId }),
    ])
    const data: DeveloperWebhookState = {
      subcriptionCustomers,
      subcriptionTopics,
    }
    if (data) {
      yield put(requestWebhookSubcriptionReceiveData(data))
    } else {
      yield put(requestWebhookSubcriptionReceiveFailure())
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const createNewWebhook = function*({ data }: Action<CreateWebhookParams>) {
  try {
    yield call(fetchCreateNewWebhook, data)
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const requestWebhookData = function*({ data }: Action<WebhookDataRequestParams>) {
  try {
    yield call(fetchWebhookData, data)
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const requestWebhookSupcriptionDataListen = function*() {
  yield takeLatest<Action<WebhookSubcriptionDataRequest>>(
    ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA,
    requestSupcriptionData,
  )
}

export const createDeveloperWebhookListen = function*() {
  yield takeLatest<Action<CreateWebhookParams>>(ActionTypes.WEBHOOK_CREATE, createNewWebhook)
}

export const requestWebhookDataListen = function*() {
  yield takeLatest<Action<WebhookDataRequestParams>>(ActionTypes.WEBHOOK_REQUEST_DATA, requestWebhookData)
}

const developerWebhookSagas = function*() {
  yield all([
    fork(requestWebhookSupcriptionDataListen),
    fork(createDeveloperWebhookListen),
    fork(requestWebhookDataListen),
  ])
}

export default developerWebhookSagas
