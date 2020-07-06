import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { NotificationMessageState } from '../reducers/notification-message'

export const showNotificationMessage = actionCreator<Partial<NotificationMessageState>>(
  ActionTypes.SHOW_NOTIFICATION_MESSAGE,
)
export const hideNotificationMessage = actionCreator(ActionTypes.HIDE_NOTIFICATION_MESSAGE)
