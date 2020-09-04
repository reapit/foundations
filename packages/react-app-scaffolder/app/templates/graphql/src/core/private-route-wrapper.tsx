import * as React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation, Redirect } from 'react-router'
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from '@/graphql/client'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const accessToken = connectSession?.accessToken || ''

  if (!connectSession) {
    return null
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }
  return (
    <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
      <AppNavContainer>
        <Menu />
        <FlexContainerBasic flexColumn isScrollable>
          <FlexContainerResponsive hasPadding flexColumn>
            <Suspense
              fallback={
                <Section>
                  <Loader />
                </Section>
              }
            >
              {children}
            </Suspense>
          </FlexContainerResponsive>
        </FlexContainerBasic>
      </AppNavContainer>
    </ApolloProvider>
  )
}

export default PrivateRouteWrapper
