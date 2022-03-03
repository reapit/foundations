import { notification } from '@reapit/elements-legacy'
import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import ActionTypes from '../../constants/action-types'
import { Action } from '../../types/core'
import errorMessages from '../../constants/error-messages'
import { fetchWebhookLogsError, fetchWebhookLogsSuccess } from '../../actions/webhook-logs/webhook-logs'
import { fetchWebhookLogsApi } from '../../services/webhooks'
import { WebhookLogsQuery } from '../../components/pages/webhooks/webhooks-logs'

export const fetchWebhookLogs = function* ({ data }: Action<WebhookLogsQuery>) {
  try {
    const logs = yield call(fetchWebhookLogsApi, { ...data })
    yield put(fetchWebhookLogsSuccess({ logs: logs ?? [] }))
  } catch (err: any) {
    yield put(fetchWebhookLogsError(err.description))
    // Weirdly the API returns a 404 when no logs are found - this is intended not an error so handling
    // by showing an info message not an error
    if (err.statusCode === 404) {
      return notification.info({
        message: 'No logs found for this application found within the selected date range',
      })
    }

    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const webhookLogsListen = function* () {
  yield takeLatest<Action<WebhookLogsQuery>>(ActionTypes.FETCH_WEBHOOK_LOGS, fetchWebhookLogs)
}

export const webhookLogsSagas = function* () {
  yield all([fork(webhookLogsListen)])
}
