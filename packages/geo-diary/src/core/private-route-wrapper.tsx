import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer } from '@reapit/elements'
import ErrorBoundary from './error-boundary'
import { Redirect, useLocation } from 'react-router'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from '@/graphql/client'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const accessToken = connectSession?.accessToken || ''

  if (!connectSession) {
    return (
      <AppNavContainer>
        <Loader body />
      </AppNavContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
      <AppNavContainer>
        <Menu />
        <Suspense fallback={<Loader body />}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
      </AppNavContainer>
    </ApolloProvider>
  )
}

export default PrivateRouteWrapper
