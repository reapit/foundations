import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation, Redirect } from 'react-router'
import Routes from '@/constants/routes'
import { Loader, MainContainer } from '@reapit/elements'
import { Nav } from '../components/ui/nav/nav'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const hasAccess = connectSession?.loginIdentity?.groups.includes('OrganisationAdmin')

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader label="Loading" fullPage />
      </MainContainer>
    )
  }

  const { pathname } = location

  if (!hasAccess && pathname !== Routes.ACCESS_DENIED) {
    return <Redirect to={Routes.ACCESS_DENIED} />
  }

  if (pathname === '/') {
    return <Redirect to={Routes.OFFICES} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }
  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
