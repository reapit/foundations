import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Redirect } from 'react-router'
import Routes from '../constants/routes'
import ErrorBoundary from '../components/error-boundary'
import { Nav } from '../components/nav'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'
import { GlobalProvider } from './use-global-state'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (window.location.pathname === '/') {
    return <Redirect to={Routes.ACCOUNTS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <MainContainer>
      <GlobalProvider>
        <Nav />
        <Suspense fallback={<Loader fullPage />}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
      </GlobalProvider>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
