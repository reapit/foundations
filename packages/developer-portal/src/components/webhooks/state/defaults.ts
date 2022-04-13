import dayjs from 'dayjs'
import { WebhooksFilterState } from './use-webhooks-state'

export const defaultWebhooksFilterState: WebhooksFilterState = {
  applicationId: '',
  from: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
  to: dayjs().format('YYYY-MM-DD'),
}
