import React, { useContext } from 'react'
import { ToastMessage } from '@reapit/elements-legacy'
import { defaultMessageState, MessageContext } from '../../context/message-context'

const ToastError: React.FC = () => {
  const { messageState, setMessageState } = useContext(MessageContext)
  const { errorMessage, infoMessage } = messageState
  const message = errorMessage ? errorMessage : infoMessage ? infoMessage : ''
  const variant = errorMessage ? 'danger' : 'primary'
  const visible = Boolean(errorMessage || infoMessage)

  const onCloseToast = () => setMessageState(defaultMessageState)

  return <ToastMessage visible={visible} message={message} variant={variant} onCloseToast={onCloseToast} hasNavBar />
}

export default ToastError
