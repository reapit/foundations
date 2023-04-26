import * as React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import Nav from '../components/ui/nav/nav'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation, Navigate } from 'react-router'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'
import { PropsWithChildren } from 'react'

const { Suspense } = React

export const PrivateRouteWrapper: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
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
    return <Navigate to={connectInternalRedirect} />
  }
  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
