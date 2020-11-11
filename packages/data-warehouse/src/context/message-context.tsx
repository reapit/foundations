import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface MessageState {
  errorMessage?: string
  infoMessage?: string
}

export interface MessageContextProps {
  messageState: Partial<MessageState>
  setMessageState: Dispatch<SetStateAction<Partial<MessageState>>>
}

export const defaultMessageState: MessageState = {
  errorMessage: undefined,
  infoMessage: undefined,
}

export const MessageContext = createContext<MessageContextProps>({} as MessageContextProps)

const { Consumer, Provider } = MessageContext

export const MessageProvider: React.FC = ({ children }) => {
  const [messageState, setMessageState] = useState<Partial<MessageState>>(defaultMessageState)

  return (
    <Provider
      value={{
        messageState,
        setMessageState,
      }}
    >
      {children}
    </Provider>
  )
}

export const MessageConsumer = Consumer
