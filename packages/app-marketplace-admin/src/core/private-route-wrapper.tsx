import React, { FC, Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, MainContainer, PageContainer, PersistentNotification } from '@reapit/elements'
import { Routes } from '../constants/routes'

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location?.pathname}${location?.search}`
  const isRoot = connectInternalRedirect === '/?' || connectInternalRedirect === '/' || window.location.pathname === '/'
  const groups = connectSession?.loginIdentity?.groups ?? []
  const hasAccess = groups.includes('ReapitEmployeeFoundationsAdmin') || groups.includes('ReapitEmployee')

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (!hasAccess) {
    return (
      <MainContainer>
        <PageContainer>
          <PersistentNotification intent="danger" isExpanded isInline isFullWidth>
            You do not have permission to view this page.
          </PersistentNotification>
        </PageContainer>
      </MainContainer>
    )
  }

  if (isRoot) {
    return <Redirect to={Routes.APPS_BROWSE_MANAGER} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
