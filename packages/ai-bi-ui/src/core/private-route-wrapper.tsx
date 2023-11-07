import React, { FC, Suspense, PropsWithChildren } from 'react'
import Menu from './menu'
import { Navigate, useLocation } from 'react-router'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { HelperWidget, HelperWidgetApps } from '@reapit/utils-react'
import { GlobalProvider } from './use-global-state'
import { FourOFour } from './router'

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()

  const currentUri = `${location.pathname}${location.search}`
  const isAusUser = connectSession?.loginIdentity.orgProduct?.toLowerCase() === 'agentbox'

  if (isAusUser) {
    return <FourOFour />
  }

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <GlobalProvider>
      <MainContainer>
        <Menu />
        <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
        {process.env.appEnv !== 'production' && <HelperWidget appName={HelperWidgetApps.developerPortal} />}
      </MainContainer>
    </GlobalProvider>
  )
}
