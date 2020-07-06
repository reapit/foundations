import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { ToastMessage as ToastMessageElement } from '@reapit/elements'
import { hideNotificationMessage } from '@/actions/notification-message'
import { selectNotificationMessageState } from '@/selector/notification-message'

export type ToastMessageProps = {}

export const handleOnCloseToast = (dispatch: Dispatch) => {
  return () => {
    dispatch(hideNotificationMessage(null))
  }
}

const ToastMessage: React.FC<ToastMessageProps> = () => {
  const dispatch = useDispatch()
  const { message, variant, visible } = useSelector(selectNotificationMessageState)
  const onCloseToast = React.useCallback(handleOnCloseToast(dispatch), [dispatch])

  return (
    <ToastMessageElement
      visible={visible}
      message={message}
      variant={variant || 'primary'}
      onCloseToast={onCloseToast}
    />
  )
}

export default ToastMessage
