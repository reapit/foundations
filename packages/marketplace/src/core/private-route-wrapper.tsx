import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { Redirect, useLocation } from 'react-router'
import Routes from '@/constants/routes'
import { selectDeveloperId, selectIsAdmin } from '../selector/auth'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path?: string
  showMenu?: boolean
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const isRoot = connectInternalRedirect === '/?' || connectInternalRedirect === '/' || window.location.pathname === '/'
  const isDeveloperEdition = Boolean(selectDeveloperId(connectSession))
  const isDesktopAdmin = selectIsAdmin(connectSession)
  const isAdmin = isDesktopAdmin || isDeveloperEdition

  if (!connectSession) {
    return null
  }

  if (isRoot || (location.pathname.includes(Routes.MY_APPS) && !isAdmin)) {
    return <Redirect to={Routes.APPS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      <FlexContainerBasic id="app-root-container" flexColumn isScrollable>
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
