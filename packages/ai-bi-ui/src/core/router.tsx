import React, { Suspense, lazy, FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils-react'
import RoutePaths from '../constants/routes'
import { PrivateRouteWrapper } from './private-route-wrapper'
import { Loader, PageContainer, PersistentNotification } from '@reapit/elements'
import ErrorBoundary from './error-boundary'

const Login = lazy(() => catchChunkError(() => import('../components/login')))
const Apps = lazy(() => catchChunkError(() => import('../components/ai')))

export const FourOFour: FC = () => (
  <PageContainer>
    <PersistentNotification isFullWidth isInline isExpanded intent="danger">
      Page not found
    </PersistentNotification>
  </PageContainer>
)

export const RoutesComponent = () => {
  return (
    <Routes>
      {/* <Route path={RoutePaths.OK} element={<OkayPage />} /> */}
      <Route path={RoutePaths.LOGIN} element={<Login />} />
      <Route path={RoutePaths.FOUR_O_FOUR} element={<FourOFour />} />
      <Route
        path={`${RoutePaths.HOME}`}
        element={
          <PrivateRouteWrapper>
            <Apps />
          </PrivateRouteWrapper>
        }
      />
    </Routes>
  )
}

const Router: FC = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Suspense fallback={<Loader fullPage />}>
        <RoutesComponent />
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>
)

export default Router
