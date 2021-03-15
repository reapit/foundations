import { notification } from '@reapit/elements'
import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { fetchWebhooksTopicsFailed, fetchWebhooksTopicsSuccess } from '@/actions/webhooks-topics'
import { fetchWebhooksTopicsListApi, FetchWebhooksTopicsListParams } from '@/services/webhooks'

export const fetchWebhooksTopics = function* ({ data }: Action<FetchWebhooksTopicsListParams>) {
  try {
    const response = yield call(fetchWebhooksTopicsListApi, { ...data })
    yield put(fetchWebhooksTopicsSuccess(response))
  } catch (err) {
    yield put(fetchWebhooksTopicsFailed(err.description))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const webhooksTopicsListen = function* () {
  yield takeLatest<Action<FetchWebhooksTopicsListParams>>(ActionTypes.FETCH_WEBHOOK_TOPICS, fetchWebhooksTopics)
}

export const webhooksTopicsSagas = function* () {
  yield all([fork(webhooksTopicsListen)])
}
