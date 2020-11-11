import React, { useContext } from 'react'
import { ToastMessage } from '@reapit/elements'
import { MessageContext } from '../../context/message-context'

const ToastError: React.FC = () => {
  const { messageState, setMessageState } = useContext(MessageContext)
  const { visible, message, variant } = messageState
  const onCloseToast = () => setMessageState(prev => ({ ...prev, visible: false }))

  return <ToastMessage visible={visible} message={message} variant={variant} onCloseToast={onCloseToast} hasNavBar />
}

export default ToastError
