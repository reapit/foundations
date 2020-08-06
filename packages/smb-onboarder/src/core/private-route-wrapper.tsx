import * as React from 'react'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession) {
    return null
  }

  if (location.pathname === '/') {
    return <Redirect to={Routes.HELP} />
  }

  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerResponsive hasPadding flexColumn>
        <FlexContainerBasic isScrollable flexColumn>
          <Suspense
            fallback={
              <Section>
                <Loader />
              </Section>
            }
          >
            {children}
          </Suspense>
        </FlexContainerBasic>
      </FlexContainerResponsive>
    </AppNavContainer>
  )
}

export default withRouter(PrivateRouteWrapper)
