import { WebhookLogsListState } from '../../reducers/webhook-logs/list'
import { ReduxState } from '../../types/core'

export const selectWebhookLogs = (state: ReduxState): WebhookLogsListState => {
  return state?.webhookLogs?.list
}
