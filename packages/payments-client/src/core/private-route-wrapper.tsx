import * as React from 'react'
import { Route, Redirect, useLocation, Switch } from 'react-router'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import Menu from '../components/ui/menu'
import { reapitConnectBrowserSession } from './connect-session'
import Routes from '../constants/routes'
import { catchChunkError } from './router'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

const PaymentSessionPage = React.lazy(() => catchChunkError(() => import('../components/pages/payment-session')))

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const location = useLocation()
  const { pathname, search } = location
  const currentUri = `${pathname}${search}`
  const queryParams = new URLSearchParams(search)
  const session = queryParams.get('session')

  if (session) {
    return (
      <AppNavContainer>
        <FlexContainerBasic flexColumn isScrollable>
          <FlexContainerResponsive hasPadding flexColumn>
            <Suspense
              fallback={
                <Section>
                  <Loader />
                </Section>
              }
            >
              <Switch>
                <Route path={Routes.PAYMENT} component={PaymentSessionPage} exact />
                <Redirect to={Routes.LOGIN} />
              </Switch>
            </Suspense>
          </FlexContainerResponsive>
        </FlexContainerBasic>
      </AppNavContainer>
    )
  }

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
