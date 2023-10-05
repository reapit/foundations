import React, { FC, PropsWithChildren } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation, Navigate } from 'react-router'
import Routes from '@/constants/routes'
import { Loader, MainContainer } from '@reapit/elements'
import { Nav } from '../components/ui/nav/nav'
import { SWRConfig } from 'swr'
import { fetcher } from '../utils/fetcher'

const { Suspense } = React

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const hasAccess = connectSession?.loginIdentity?.groups?.includes('OrganisationAdmin')

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  const { pathname } = location

  if (pathname === '/') {
    return <Navigate to={Routes.USERS} />
  }

  if (!hasAccess && pathname !== Routes.ACCESS_DENIED) {
    return <Navigate to={Routes.ACCESS_DENIED} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher,
      }}
    >
      <MainContainer>
        <Nav />
        <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
      </MainContainer>
    </SWRConfig>
  )
}

export default PrivateRouteWrapper
