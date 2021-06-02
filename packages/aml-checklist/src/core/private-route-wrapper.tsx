import * as React from 'react'
import { AppNavContainer, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { Redirect, useLocation } from 'react-router'
import { Loader } from '@reapit/elements/v3'

const { Suspense } = React

export const PrivateRouteWrapper: React.FC = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <AppNavContainer>
        <FlexContainerBasic flexColumn isScrollable>
          <FlexContainerResponsive flexColumn>
            <Loader label="Loading" fullPage />
          </FlexContainerResponsive>
        </FlexContainerBasic>
      </AppNavContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerBasic flexColumn isScrollable>
        <FlexContainerResponsive flexColumn isFullHeight>
          <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
