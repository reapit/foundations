import * as React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import Menu from '../components/ui/nav'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader label="Loading" fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }
  return (
    <MainContainer>
      <Menu />
      <PageContainer>
        <PageContainer>
          <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
        </PageContainer>
      </PageContainer>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
