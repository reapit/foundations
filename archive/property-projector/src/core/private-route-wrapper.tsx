import * as React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import { reapitConnectBrowserSession } from '@/core/connect-session'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  if (!connectSession) {
    return null
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
