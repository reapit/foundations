import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import {
  fetchWebhooksSubscriptionsFailed,
  fetchWebhooksSubscriptionsSuccess,
  setApplicationId,
} from '@/actions/webhooks-subscriptions'
import { fetchWebhooksSubscriptionsListApi, FetchWebhooksSubscriptionsListParams } from '@/services/webhooks'
import { notification } from '@reapit/elements-legacy'

export const webhooksSubscriptionsFetch = function* ({ data }: Action<FetchWebhooksSubscriptionsListParams>) {
  try {
    yield put(setApplicationId(data?.applicationId?.[0] as string))
    const response = yield call(fetchWebhooksSubscriptionsListApi, data)
    yield put(fetchWebhooksSubscriptionsSuccess(response))
  } catch (err: any) {
    yield put(fetchWebhooksSubscriptionsFailed(err.description))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const webhooksSubscriptionsListen = function* () {
  yield takeLatest<Action<FetchWebhooksSubscriptionsListParams>>(
    ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS,
    webhooksSubscriptionsFetch,
  )
}

export const webhooksSubscriptionsSagas = function* () {
  yield all([fork(webhooksSubscriptionsListen)])
}
