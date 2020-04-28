import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import { URLS, initAuthorizedRequestHeaders } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { errorThrownServer } from '@/actions/error'
import {
  webhookSubscriptionsReceiveData,
  webhookTopicsReceiveData,
  setApplicationId,
} from '@/actions/webhook-subscriptions'

export const fetchSubscriptions = async () => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.webhookSubscriptions}`,
    api: window.reapit.config.platformApiUrl,
    method: 'GET',
    headers: headers,
  })
  return response
}

export const fetchWebhookTopic = async (applicationId: string) => {
  const headers = await initAuthorizedRequestHeaders()
  const response = await fetcher({
    url: `${URLS.webhookTopics}?applicationId=${applicationId}`,
    api: window.reapit.config.platformApiUrl,
    method: 'GET',
    headers: headers,
  })
  return response
}

export const webhookSubscriptionsFetch = function*() {
  try {
    const response = yield call(fetchSubscriptions)
    if (response) {
      yield put(webhookSubscriptionsReceiveData(response))
    }
  } catch (error) {
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const webhookTopicsFetch = function*({ data: applicationId }: Action<string>) {
  try {
    yield put(setApplicationId(applicationId))
    const response = yield call(fetchWebhookTopic, applicationId)
    if (response) {
      yield put(webhookTopicsReceiveData(response))
    }
  } catch (error) {
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const webhookSubscriptionsListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.WEBHOOK_SUBSCRIPTION_REQUEST_DATA, webhookSubscriptionsFetch)
}

export const webhookTopicsListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.WEBHOOK_TOPICS_REQUEST_DATA, webhookTopicsFetch)
}

const webhookSubscriptionsSagas = function*() {
  yield all([fork(webhookSubscriptionsListen), fork(webhookTopicsListen)])
}

export default webhookSubscriptionsSagas
