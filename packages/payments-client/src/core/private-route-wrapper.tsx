import React, { FC } from 'react'
import { Redirect, useLocation } from 'react-router'
import { useReapitConnect } from '@reapit/connect-session'
import Nav from './nav'
import { reapitConnectBrowserSession } from './connect-session'
import { Routes } from '../constants/routes'
import { Loader, MainContainer } from '@reapit/elements'
import { PaymentsProvider } from './use-payments-state'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children }) => {
  const location = useLocation()
  const { pathname, search } = location
  const currentUri = `${pathname}${search}`

  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)

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
    window.location.pathname !== `${Routes.PAYMENTS}/${window['__REAPIT_MARKETPLACE_GLOBALS__'].nomTranCode}`
  ) {
    return <Redirect to={`${Routes.PAYMENTS}/${window['__REAPIT_MARKETPLACE_GLOBALS__'].nomTranCode}`} />
  }

  if (window.location.pathname === '/') {
    return <Redirect to={Routes.PAYMENTS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <PaymentsProvider>
      <MainContainer>
        <Nav />
        <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
      </MainContainer>
    </PaymentsProvider>
  )
}

export default PrivateRouteWrapper
