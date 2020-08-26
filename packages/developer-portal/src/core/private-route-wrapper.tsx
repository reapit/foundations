import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { Redirect, useLocation } from 'react-router'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getCookieString, COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE } from '@/utils/cookie'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
  showMenu?: boolean
}

/* export const handleOnAcceptClientWelcome = ({
  dispatch,
  setClientTermAcceptedCookieAndState,
}: {
  dispatch: Dispatch
  setClientTermAcceptedCookieAndState: ActionCreator<boolean>
}) => () => dispatch(setClientTermAcceptedCookieAndState(true)) */

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const isRoot = connectInternalRedirect === '/?' || connectInternalRedirect === '/' || window.location.pathname === '/'

  if (!connectSession) {
    return null
  }

  if (isRoot) {
    return <Redirect to={Routes.APPS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  const hasReadWelcome = Boolean(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE))
  if (!hasReadWelcome && location.pathname === Routes.APPS) {
    return <Redirect to={Routes.WELCOME} />
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      <FlexContainerBasic flexColumn isScrollable>
        <FlexContainerResponsive
          hasPadding
          flexColumn
          // I want to allow scrolling beyond the end of the page to allow for the toast notification
          // except on the Gitbook page because the iframe handles it's own scrolling
          isPageContainer={location.pathname !== Routes.API_DOCS}
        >
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
