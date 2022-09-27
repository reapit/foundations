import React from 'react'
import { useReapitConnect } from '@reapit/connect-session-next'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { HelperWidget, HelperWidgetApps } from '@reapit/utils-react'
import { GlobalProvider } from './use-global-state'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
  showMenu?: boolean
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  return (
    <GlobalProvider>
      <MainContainer>
        <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
        {window.reapit.config.appEnv !== 'production' && <HelperWidget appName={HelperWidgetApps.developerPortal} />}
      </MainContainer>
    </GlobalProvider>
  )
}

export default PrivateRouteWrapper
