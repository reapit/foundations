import * as React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, Section, AppNavContainer } from '@reapit/elements-legacy'
import Menu from '@/components/ui/menu'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation, Redirect } from 'react-router'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <AppNavContainer>
        <Loader />
      </AppNavContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }
  return (
    <AppNavContainer>
      <Menu />
      <Suspense
        fallback={
          <Section>
            <Loader />
          </Section>
        }
      >
        {children}
      </Suspense>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
