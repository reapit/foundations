import React, { FC, PropsWithChildren, Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Navigate } from 'react-router'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'
import { getIsAdmin } from '../utils/is-admin'
import { RoutePaths } from '../constants/routes'

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location?.pathname}${location?.search}`
  const isAdmin = getIsAdmin(connectSession)

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  if (!isAdmin && currentUri === RoutePaths.ADMIN) {
    return <Navigate to={RoutePaths.HOME} />
  }

  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
