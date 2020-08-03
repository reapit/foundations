import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchWebhooksTopicsListParams, PagedResultTopicModel_ } from '@/services/webhooks'

export const fetchWebhooksTopics = actionCreator<FetchWebhooksTopicsListParams>(ActionTypes.FETCH_WEBHOOK_TOPICS)
export const fetchWebhooksTopicsSuccess = actionCreator<PagedResultTopicModel_>(
  ActionTypes.FETCH_WEBHOOK_TOPICS_SUCCESS,
)
export const fetchWebhooksTopicsFailed = actionCreator<string>(ActionTypes.FETCH_WEBHOOK_TOPICS_FAILED)
