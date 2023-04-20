import React from 'react'
import { useReapitConnect } from '@reapit/connect-session-next'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { HelperWidget, HelperWidgetApps } from '@reapit/utils-react'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
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
    <MainContainer>
      <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
      {process.env.appEnv !== 'production' && <HelperWidget appName={HelperWidgetApps.developerPortal} />}
    </MainContainer>
  )
}

export default PrivateRouteWrapper
