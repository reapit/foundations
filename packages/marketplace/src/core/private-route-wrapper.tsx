import React, { FC, Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, MainContainer, PageContainer, PersistentNotification } from '@reapit/elements'
import { Routes } from '../constants/routes'
import { AppsBrowseProvider } from './use-apps-browse-state'
import { AnalyticsBanner } from './analytics-banner'

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children }) => {
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
    return <Redirect to={Routes.APPS_BROWSE} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
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
