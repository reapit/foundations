import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer } from '@reapit/elements'
import ErrorBoundary from './error-boundary'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({ children }) => {
  return (
    <AppNavContainer>
      <Menu />
      <Suspense fallback={<Loader body />}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
