import * as React from 'react'
import { ReapitConnectBrowserSession, useReapitConnect } from '@reapit/connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, PageContainer } from '@reapit/elements'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
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
    return <Redirect to={connectInternalRedirect} />
  }
  return <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
}

export default PrivateRouteWrapper
