import React, { FC, PropsWithChildren, Suspense } from 'react'
import Nav from '../components/ui/nav'
import ErrorBoundary from './error-boundary'
import { Navigate, useLocation } from 'react-router'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { ApolloProvider } from '@apollo/client'
import { Loader, MainContainer, PageContainer, PersistentNotification } from '@reapit/elements'
import client from '../graphql/client'

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (!connectSession?.loginIdentity?.userCode) {
    return (
      <MainContainer>
        <Nav />
        <PageContainer>
          <PersistentNotification isExpanded isInline isFullWidth intent="danger">
            We could not detect that you are a negotiator for your organisation from your login. Try logging out and
            then back in again. If this does not work, please contact your Reapit administrator.
          </PersistentNotification>
        </PageContainer>
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <MainContainer>
      <Nav />
      <ErrorBoundary>
        <Suspense fallback={<Loader fullPage />}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </Suspense>
      </ErrorBoundary>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
