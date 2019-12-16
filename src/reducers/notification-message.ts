import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { showNotificationMessage, hideNotificationMessage } from '../actions/notification-message'
import { ToastVariant } from '@reapit/elements'

export interface NotificationMessageState {
  visible: boolean
  variant: ToastVariant | ''
  message: string
}

export const defaultState: NotificationMessageState = {
  visible: false,
  variant: '',
  message: ''
}

const notificationMessageReducer = (
  state: NotificationMessageState = defaultState,
  action: Action<any>
): NotificationMessageState => {
  if (isType(action, showNotificationMessage)) {
    return {
      ...state,
      visible: true,
      ...action.data
    }
  }

  if (isType(action, hideNotificationMessage)) {
    return defaultState
  }

  return state
}

export default notificationMessageReducer
