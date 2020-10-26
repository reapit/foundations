import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { ErrorData } from '@reapit/elements'

export interface ErrorContextProps {
  componentErrorState: ErrorData | null
  serverErrorState: ErrorData | null
  setComponentErrorState: Dispatch<SetStateAction<ErrorData | null>>
  setServerErrorState: Dispatch<SetStateAction<ErrorData | null>>
}

export const ErrorContext = createContext<ErrorContextProps>({} as ErrorContextProps)

const { Consumer, Provider } = ErrorContext

export const ErrorProvider: React.FC = ({ children }) => {
  const [componentErrorState, setComponentErrorState] = useState<ErrorData | null>(null)
  const [serverErrorState, setServerErrorState] = useState<ErrorData | null>(null)

  return (
    <Provider value={{ componentErrorState, setComponentErrorState, serverErrorState, setServerErrorState }}>
      {children}
    </Provider>
  )
}

export const ErrorConsumer = Consumer
