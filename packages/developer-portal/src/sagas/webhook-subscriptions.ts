import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { errorThrownServer } from '@/actions/error'
import { webhookSubscriptionsReceiveData, setApplicationId } from '@/actions/webhook-subscriptions'
import { fetchWebhooksSubscriptionsList } from '@/services/webhooks'

export const webhookSubscriptionsFetch = function*({ data: applicationId }: Action<string>) {
  try {
    yield put(setApplicationId(applicationId))
    const response = yield call(fetchWebhooksSubscriptionsList, { applicationId: [applicationId] })
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

export const webhookSubscriptionsListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS, webhookSubscriptionsFetch)
}

const webhookSubscriptionsSagas = function*() {
  yield all([fork(webhookSubscriptionsListen)])
}

export default webhookSubscriptionsSagas
