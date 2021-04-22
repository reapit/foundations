import { actionCreator } from '../../utils/actions'
import ActionTypes from '../../constants/action-types'
import { TopicModel, WebhookLogModel } from '../../services/webhooks'
import { WebhookLogsQuery } from '../../components/pages/webhooks/webhook-logs-table'

export const fetchWebhookLogs = actionCreator<WebhookLogsQuery>(ActionTypes.FETCH_WEBHOOK_LOGS)
export const fetchWebhookLogsSuccess = actionCreator<{ logs: WebhookLogModel[]; topics: TopicModel[] }>(
  ActionTypes.FETCH_WEBHOOK_LOGS_SUCCESS,
)
export const fetchWebhookLogsError = actionCreator<string>(ActionTypes.FETCH_WEBHOOK_LOGS_ERROR)
