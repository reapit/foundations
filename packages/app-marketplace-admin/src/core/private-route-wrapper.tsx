import React, { FC, PropsWithChildren, Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Navigate } from 'react-router'
import { Loader, MainContainer, PageContainer, PersistentNotification } from '@reapit/elements'

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location?.pathname}${location?.search}`
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

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
