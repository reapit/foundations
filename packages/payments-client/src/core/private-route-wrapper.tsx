import React, { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useReapitConnect } from '@reapit/connect-session'
import Nav from './nav'
import { reapitConnectBrowserSession } from './connect-session'
import { RoutePaths } from '../constants/routes'
import { Loader, MainContainer } from '@reapit/elements'
import { ORG_ADMIN_GROUP } from '../constants/permissions'
import { ConfigProvider } from './use-config-state'

const { Suspense } = React

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()
  const { pathname, search } = location
  const currentUri = `${pathname}${search}`

  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const isAdmin = connectSession?.loginIdentity?.groups?.includes(ORG_ADMIN_GROUP)

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (
    window['__REAPIT_MARKETPLACE_GLOBALS__'] &&
    window['__REAPIT_MARKETPLACE_GLOBALS__'].nomTranCode &&
    window.location.pathname !== `${RoutePaths.PAYMENTS}/${window['__REAPIT_MARKETPLACE_GLOBALS__'].nomTranCode}`
  ) {
    return <Navigate to={`${RoutePaths.PAYMENTS}/${window['__REAPIT_MARKETPLACE_GLOBALS__'].nomTranCode}`} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  if (window.location.pathname === '/' || (window.location.pathname === RoutePaths.ADMIN && !isAdmin)) {
    return <Navigate to={RoutePaths.PAYMENTS} />
  }

  return (
    <MainContainer>
      <Nav />
      <ConfigProvider>
        <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
      </ConfigProvider>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
