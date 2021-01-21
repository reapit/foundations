import * as React from 'react'
import { Redirect, useLocation } from 'react-router'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import Menu from '../components/ui/menu'
import { reapitConnectBrowserSession } from './connect-session'
import Routes from '../constants/routes'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const location = useLocation()
  const { pathname, search } = location
  const currentUri = `${pathname}${search}`

  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession) {
    return (
      <AppNavContainer>
        <FlexContainerBasic flexColumn isScrollable>
          <FlexContainerResponsive hasPadding flexColumn>
            <Loader />
          </FlexContainerResponsive>
        </FlexContainerBasic>
      </AppNavContainer>
    )
  }

  if (
    window['__REAPIT_MARKETPLACE_GLOBALS__'] &&
    window['__REAPIT_MARKETPLACE_GLOBALS__'].prpCode &&
    window.location.pathname !== Routes.RENTALS
  ) {
    return <Redirect to={Routes.RENTALS} />
  }

  if (window.location.pathname === '/') {
    return <Redirect to={Routes.PAYMENTS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerBasic flexColumn isScrollable>
        <FlexContainerResponsive hasPadding flexColumn>
          <Suspense
            fallback={
              <Section>
                <Loader />
              </Section>
            }
          >
            {children}
          </Suspense>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
