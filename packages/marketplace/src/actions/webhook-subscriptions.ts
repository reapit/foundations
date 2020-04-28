import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { PagedResultWebhookModel_, PagedResultTopicModel_ } from '@/reducers/webhook-subscriptions'

export const webhookSubscriptionsRequestData = actionCreator<string>(ActionTypes.WEBHOOK_SUBSCRIPTION_REQUEST_DATA)
export const webhookSubscriptionsReceiveData = actionCreator<PagedResultWebhookModel_>(
  ActionTypes.WEBHOOK_SUBSCRIPTION_RECEIVE_DATA,
)
export const webhookTopicsRequestData = actionCreator<void>(ActionTypes.WEBHOOK_TOPICS_REQUEST_DATA)
export const webhookTopicsReceiveData = actionCreator<PagedResultTopicModel_>(ActionTypes.WEBHOOK_TOPICS_RECEIVE_DATA)
export const setApplicationId = actionCreator<string>(ActionTypes.WEBHOOK_SET_APPLICATION_ID)
