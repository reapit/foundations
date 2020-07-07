import { ReduxState } from '@/types/core'
import { NotificationMessageState } from '@/reducers/notification-message'

export const selectNotificationMessageState = (state: ReduxState): NotificationMessageState => {
  return state.noticationMessage
}
