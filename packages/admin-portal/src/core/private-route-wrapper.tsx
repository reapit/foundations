import React, { FC } from 'react'
import Menu from '../components/menu/menu'
import { useLocation, Redirect } from 'react-router'
import Routes from '../constants/routes'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { PermissionsProvider } from './use-permissions-state'
const { Suspense } = React

export type PrivateRouteWrapperProps = {
  path: string
  showMenu?: boolean
}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children, showMenu = true }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const isRoot = connectInternalRedirect === '/?' || connectInternalRedirect === '/' || window.location.pathname === '/'

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (isRoot) {
    return <Redirect to={Routes.APPS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <PermissionsProvider>
      <MainContainer>
        {showMenu && <Menu />}
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </MainContainer>
    </PermissionsProvider>
  )
}

export default PrivateRouteWrapper
