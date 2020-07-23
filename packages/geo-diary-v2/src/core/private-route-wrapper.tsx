import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer } from '@reapit/elements'
import { ReapitConnectContext, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import ErrorBoundary from './error-boundary'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({ children }) => {
  const session = useReapitConnect(reapitConnectBrowserSession)

  if (!session.connectSession) {
    return null
  }
  return (
    <ReapitConnectContext.Provider value={{ ...session }}>
      <AppNavContainer>
        <Menu />
        <Suspense fallback={<Loader body />}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
      </AppNavContainer>
    </ReapitConnectContext.Provider>
  )
}

export default PrivateRouteWrapper
