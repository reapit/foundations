import * as React from 'react'
import { ReapitConnectContext, useReapitConnect } from '@reapit/connect-session'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import Menu from '../components/ui/menu'
import { ReapitConnectBrowserSessionInstance } from '../core/connect-session'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const session = useReapitConnect(ReapitConnectBrowserSessionInstance.instance)

  if (!session.connectSession) {
    return null
  }
  return (
    <ReapitConnectContext.Provider value={{ ...session }}>
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
    </ReapitConnectContext.Provider>
  )
}

export default PrivateRouteWrapper
