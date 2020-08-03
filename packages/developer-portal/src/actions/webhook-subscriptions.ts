import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { PagedResultWebhookModel_ } from '@/reducers/webhook-subscriptions'

export const webhookSubscriptionsRequestData = actionCreator<string>(ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS)
export const webhookSubscriptionsReceiveData = actionCreator<PagedResultWebhookModel_>(
  ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS_SUCCESS,
)
export const setApplicationId = actionCreator<string>(ActionTypes.WEBHOOK_SET_APPLICATION_ID)
