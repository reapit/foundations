import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import React, { useContext } from 'react'

const ConnectSessionContext = React.createContext<ReapitConnectBrowserSession | undefined>(undefined)

export const ConnectSessionProvider = ConnectSessionContext.Provider

export const useConnectSession = () => useContext(ConnectSessionContext)
