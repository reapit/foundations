import * as React from 'react'
import { Loader, AppNavContainer, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { Redirect, useLocation } from 'react-router'

const { Suspense } = React

export const PrivateRouteWrapper: React.FC = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const hasBackground = location.pathname === Routes.RESULTS
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return null
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerBasic hasPadding flexColumn isScrollable>
        <FlexContainerResponsive flexColumn hasBackground={hasBackground}>
          <Suspense fallback={<Loader body />}>{children}</Suspense>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
