// TODO: WILL MOVE ALL DEVELOPER ACTIONS TO HERE
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { WebhookPingTestStatus } from '@/reducers/developer'
import { CreateDeveloperModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'
import { PingWebhooksByIdParams } from '@/services/webhooks'
export const developerCreate = actionCreator<CreateDeveloperModel>(ActionTypes.DEVELOPER_CREATE)
export const developerSetFormState = actionCreator<FormState>(ActionTypes.DEVELOPER_SET_FORM_STATE)
export const fetchMyIdentity = actionCreator<void>(ActionTypes.DEVELOPER_FETCH_MY_IDENTITY)
export const setMyIdentity = actionCreator<DeveloperModel>(ActionTypes.DEVELOPER_SET_MY_IDENTITY)
export const developerWebhookPing = actionCreator<PingWebhooksByIdParams>(ActionTypes.DEVELOPER_PING_WEBHOOK)
export const developerSetWebhookPingStatus = actionCreator<WebhookPingTestStatus>(
  ActionTypes.DEVELOPER_SET_PING_WEBHOOK_STATUS,
)
