import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '../types/core'
import ActionTypes from '../constants/action-types'
import { DeveloperWebhookDataRequest, DeveloperWebhookState } from '@/reducers/developer-webhook-modal'
import {
  requestDeveloperWebhookReceiveData,
  CreateDeveloperWebhookParams,
  developerWebhookLoading,
  developerWebhookRequestDataFailure,
  SubscriptionCustomersRequestParams,
  SubscriptionTopicsRequestParams,
} from '@/actions/developer-webhook-modal'
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

export const createNewDeveloperWebhook = async (params: CreateDeveloperWebhookParams) => {
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
  yield put(developerWebhookLoading(true))
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
      yield put(requestDeveloperWebhookReceiveData(data))
    } else {
      yield put(developerWebhookRequestDataFailure())
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

export const createNewWebhook = function*({ data }) {
  try {
    yield call(createNewDeveloperWebhook, data)
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

export const requestDeveloperWebhookDataListen = function*() {
  yield takeLatest<Action<DeveloperWebhookDataRequest>>(
    ActionTypes.DEVELOPER_WEBHOOK_REQUEST_DATA,
    requestSupcriptionData,
  )
}

export const createDeveloperWebhookListen = function*() {
  yield takeLatest<Action<CreateDeveloperWebhookParams>>(ActionTypes.DEVELOPER_WEBHOOK_CREATE, createNewWebhook)
}

const developerWebhookSagas = function*() {
  yield all([fork(requestDeveloperWebhookDataListen), fork(createDeveloperWebhookListen)])
}

export default developerWebhookSagas
