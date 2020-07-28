import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { ReapitConnectContext, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

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
  const session = useReapitConnect(reapitConnectBrowserSession)

  if (!session.connectSession) {
    return null
  }

  return (
    <ReapitConnectContext.Provider value={{ ...session }}>
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
    </ReapitConnectContext.Provider>
  )
}

export default PrivateRouteWrapper
