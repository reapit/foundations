import React, { FC, PropsWithChildren, Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Navigate } from 'react-router'
import { Loader, MainContainer, PageContainer, PersistentNotification } from '@reapit/elements'
import { RoutePaths } from '../constants/routes'
import { AppsBrowseProvider } from './use-apps-browse-state'
import { AnalyticsBanner } from './analytics-banner'

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location?.pathname}${location?.search}`
  const isRoot = connectInternalRedirect === '/?' || connectInternalRedirect === '/' || window.location.pathname === '/'
  const isAusUser = connectSession?.loginIdentity.orgProduct?.toLowerCase() === 'agentbox'

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (isAusUser) {
    return (
      <MainContainer>
        <PageContainer>
          <PersistentNotification isFullWidth isInline isExpanded intent="danger">
            Page not found
          </PersistentNotification>
        </PageContainer>
      </MainContainer>
    )
  }

  if (isRoot) {
    return <Navigate to={RoutePaths.APPS_BROWSE} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <AppsBrowseProvider>
      <MainContainer>
        <AnalyticsBanner />
        <Nav />
        <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
      </MainContainer>
    </AppsBrowseProvider>
  )
}

export default PrivateRouteWrapper
