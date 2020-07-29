import * as React from 'react'
import { Loader, AppNavContainer, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

const { Suspense } = React

export const PrivateRouteWrapper: React.FC = ({ children }) => {
  const session = useReapitConnect(reapitConnectBrowserSession)
  const hasBackground = location.pathname === Routes.RESULTS

  if (!session.connectSession) {
    return null
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
