import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Helper, Section } from '@reapit/elements'
import ErrorBoundary from './error-boundary'
import { Redirect, useHistory, useLocation } from 'react-router'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from '@/graphql/client'
import qs from 'query-string'
import { ROUTES } from '@/core/router'
import { History } from 'history'
import { useEffect } from 'react'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export type HandleUseEffectParams = {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleUseEffect = ({ queryParams, history }: HandleUseEffectParams) => () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const newQuery = qs.stringify({
        ...queryParams,
        currentLat: position.coords.latitude,
        currentLng: position.coords.longitude,
      })
      const oldQuery = qs.stringify(queryParams)
      if (newQuery !== oldQuery) {
        history.push(`${ROUTES.APPOINTMENT}?${newQuery}`)
      }
    })
  }
}

export const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const history = useHistory()
  const queryParams = qs.parse(location.search)

  useEffect(handleUseEffect({ queryParams, history }), [queryParams])

  if (!connectSession) {
    return (
      <AppNavContainer>
        <Loader body />
      </AppNavContainer>
    )
  }

  if (!connectSession?.loginIdentity?.userCode) {
    return (
      <AppNavContainer>
        <Menu />
        <Section>
          <Helper variant="info">
            We could not detect that you are a negotiator for your organisation from your login. Try logging out and
            then back in again. If this does not work, please contact your Reapit administrator.
          </Helper>
        </Section>
      </AppNavContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <ApolloProvider client={getClient(connectSession, window.reapit.config.graphqlUri)}>
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
