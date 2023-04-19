import React, { FC, PropsWithChildren, Suspense } from 'react'
import Menu from '../components/menu/menu'
import { useLocation, Navigate } from 'react-router'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { PermissionsProvider } from './use-permissions-state'

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <PermissionsProvider>
      <MainContainer>
        <Menu />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </MainContainer>
    </PermissionsProvider>
  )
}

export default PrivateRouteWrapper
