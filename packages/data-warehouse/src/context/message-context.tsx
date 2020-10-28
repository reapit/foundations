import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { ToastVariant } from '@reapit/elements'

export interface MessageState {
  visible: boolean
  message: string
  variant: ToastVariant
}

export interface MessageContextProps {
  messageState: MessageState
  setMessageState: Dispatch<SetStateAction<MessageState>>
}

export const MessageContext = createContext<MessageContextProps>({} as MessageContextProps)

const { Consumer, Provider } = MessageContext

export const MessageProvider: React.FC = ({ children }) => {
  const [messageState, setMessageState] = useState<MessageState>({
    variant: 'primary',
    message: '',
    visible: false,
  })

  return <Provider value={{ messageState, setMessageState }}>{children}</Provider>
}

export const MessageConsumer = Consumer
