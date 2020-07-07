import { showNotificationMessage, hideNotificationMessage } from '../notification-message'
import ActionTypes from '../../constants/action-types'
import { NotificationMessageState } from '../../reducers/notification-message'

describe('notification message actions', () => {
  it('should create a showNotificationMessage action', () => {
    expect(showNotificationMessage.type).toEqual(ActionTypes.SHOW_NOTIFICATION_MESSAGE)
    const notificationMessageData: Partial<NotificationMessageState> = {
      variant: 'info',
      message: 'Create successfully',
    }
    expect(showNotificationMessage(notificationMessageData).data).toEqual(notificationMessageData)
  })

  it('should create a hideNotificationMessage action', () => {
    expect(hideNotificationMessage.type).toEqual(ActionTypes.HIDE_NOTIFICATION_MESSAGE)
  })
})
