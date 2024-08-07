import React, { FC, createContext, useContext, useState, useEffect, PropsWithChildren } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from './connect-session'
import { ClientConfigModel, handleLoadOpayoScript } from '@reapit/payments-ui'

export interface ConfigStateHook {
  config: ClientConfigModel | null
  configLoading: boolean
  refreshConfig?: () => void
  clearConfigCache?: () => void
}

export const ConfigStateContext = createContext<ConfigStateHook>({
  config: null,
  configLoading: false,
})

const { Provider } = ConfigStateContext

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [configLoading, setConfigLoading] = useState<boolean>(true)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientCode = connectSession?.loginIdentity?.clientId ?? ''
  const idToken = connectSession?.idToken ?? ''

  const [config, , , refreshConfig, , clearConfigCache] = useReapitGet<ClientConfigModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getPaymentsClientConfig],
    headers: {
      'reapit-customer': clientCode,
      'reapit-id-token': idToken,
      'reapit-app-id': process.env.appId,
    },
    uriParams: {
      clientCode,
    },
    onError: () => {
      setConfigLoading(false)
    },
    fetchWhenTrue: [clientCode, idToken],
  })

  useEffect(handleLoadOpayoScript(config, setConfigLoading), [config])

  return (
    <Provider
      value={{
        config,
        configLoading,
        refreshConfig,
        clearConfigCache,
      }}
    >
      {children}
    </Provider>
  )
}

export const useConfigState = (): ConfigStateHook => {
  return useContext(ConfigStateContext)
}
