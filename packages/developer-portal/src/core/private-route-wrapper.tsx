import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { Redirect, useLocation } from 'react-router'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

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
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (location.pathname === '/') {
    return <Redirect to={Routes.LOGIN} />
  }

  if (!connectSession) return null
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
