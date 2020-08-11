import * as React from 'react'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from '@/graphql/client'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession) {
    return null
  }

  if (location.pathname === '/') {
    return <Redirect to={Routes.HELP} />
  }

  return (
    <ApolloProvider client={getClient(connectSession?.accessToken || '', window.reapit.config.graphqlUri)}>
      <AppNavContainer>
        <Menu />
        <FlexContainerResponsive hasPadding flexColumn>
          <FlexContainerBasic isScrollable flexColumn>
            <Suspense
              fallback={
                <Section>
                  <Loader />
                </Section>
              }
            >
              {children}
            </Suspense>
          </FlexContainerBasic>
        </FlexContainerResponsive>
      </AppNavContainer>
    </ApolloProvider>
  )
}

export default withRouter(PrivateRouteWrapper)
