import * as React from 'react'
import Menu from '@/components/ui/menu'
import { useLocation, Redirect } from 'react-router'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
  showMenu?: boolean
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const isRoot = connectInternalRedirect === '/'

  if (!connectSession) {
    return null
  }

  if (
    (connectInternalRedirect && currentUri !== connectInternalRedirect) ||
    (currentUri === connectInternalRedirect && isRoot)
  ) {
    const redirectUri = isRoot ? Routes.APPROVALS : connectInternalRedirect
    return <Redirect to={redirectUri} />
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      <FlexContainerBasic flexColumn isScrollable>
        <FlexContainerResponsive hasPadding flexColumn isPageContainer>
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
