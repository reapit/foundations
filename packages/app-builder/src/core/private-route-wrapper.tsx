import * as React from 'react'
import { ReapitConnectBrowserSession, useReapitConnect } from '@reapit/connect-session'
import { useLocation, Navigate } from 'react-router'
import { Loader, PageContainer } from '@reapit/elements'
import { ConnectSessionProvider } from '../components/hooks/connect-session'

const { Suspense } = React

export type PrivateRouteWrapperProps = React.PropsWithChildren & {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  reapitConnectBrowserSession,
}) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <PageContainer>
        <Loader label="Loading" fullPage />
      </PageContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <ConnectSessionProvider value={reapitConnectBrowserSession}>
      <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
    </ConnectSessionProvider>
  )
}

export default PrivateRouteWrapper
