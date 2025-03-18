import React, { Suspense, lazy } from 'react'
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils-react'
import RoutePaths from '../constants/routes'
import { PrivateRouteWrapper } from './private-route-wrapper'
import { OkayPage } from '@reapit/utils-react'
import { Loader, PageContainer, PersistentNotification } from '@reapit/elements'
import { FC } from 'react'
import ErrorBoundary from './error-boundary'
import { GithubAuthenticatedRedirectRoute } from '../components/apps/pipeline/github'

const CustomerRegister = lazy(() => catchChunkError(() => import('../components/register/customer-register')))
const Login = lazy(() => catchChunkError(() => import('../components/login')))
const Register = lazy(() => catchChunkError(() => import('../components/register')))
const Apps = lazy(() => catchChunkError(() => import('../components/apps')))
const ApiPage = lazy(() => catchChunkError(() => import('../components/api')))
const ApiDocsPage = lazy(() => catchChunkError(() => import('../components/docs')))
const AnalyticsPage = lazy(() => catchChunkError(() => import('../components/analytics')))
const RegisterConfirm = lazy(() => catchChunkError(() => import('../components/register/register-confirm')))
const SettingsPage = lazy(() => catchChunkError(() => import('../components/settings')))
const Invite = lazy(() => catchChunkError(() => import('../components/register/invite')))
const ElementsPage = lazy(() => catchChunkError(() => import('../components/elements')))
const SelectRolePage = lazy(() => catchChunkError(() => import('../components/login/select-role')))
const IaaS = lazy(() => catchChunkError(() => import('../components/iaas')))
const DeveloperEditionDownload = lazy(() =>
  catchChunkError(() => import('../components/desktop/developer-edition-download')),
)

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
      <Route path={RoutePaths.OK} element={<OkayPage />} />
      <Route path={RoutePaths.LOGIN} element={<Login />} />
      <Route path={RoutePaths.REGISTER} element={<Register />} />
      <Route path={RoutePaths.REGISTER_LEGACY} element={<Navigate to={RoutePaths.SELECT_ROLE} />} />
      <Route path={RoutePaths.SELECT_ROLE} element={<SelectRolePage />} />
      <Route path={RoutePaths.REGISTER_CONFIRM} element={<RegisterConfirm />} />
      <Route path={RoutePaths.FOUR_O_FOUR} element={<FourOFour />} />
      <Route path={RoutePaths.INVITE} element={<Invite />} />
      <Route path={RoutePaths.GITHUB_REDIRECT} element={<GithubAuthenticatedRedirectRoute />} />

      <Route
        path={RoutePaths.CUSTOMER_REGISTER}
        element={
          <PrivateRouteWrapper>
            <CustomerRegister />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={`${RoutePaths.APPS}/*`}
        element={
          <PrivateRouteWrapper>
            <Apps />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={`${RoutePaths.ANALYTICS}/*`}
        element={
          <PrivateRouteWrapper>
            <AnalyticsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.API_DOCS}
        element={
          <PrivateRouteWrapper>
            <ApiDocsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.ANALYTICS_SCHEMA_DOCS}
        element={
          <PrivateRouteWrapper>
            <ApiDocsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={`${RoutePaths.WEBHOOKS}/*`}
        element={
          <PrivateRouteWrapper>
            <ApiPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.SWAGGER}
        element={
          <PrivateRouteWrapper>
            <ApiPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.DESKTOP}
        element={
          <PrivateRouteWrapper>
            <ApiPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.GRAPHQL}
        element={
          <PrivateRouteWrapper>
            <ApiPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={`${RoutePaths.SETTINGS}/*`}
        element={
          <PrivateRouteWrapper>
            <SettingsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.ELEMENTS}
        element={
          <PrivateRouteWrapper>
            <ElementsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.IAAS}
        element={
          <PrivateRouteWrapper>
            <IaaS />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.DEVELOPER_EDITION_DOWNLOAD}
        element={
          <PrivateRouteWrapper>
            <DeveloperEditionDownload />
          </PrivateRouteWrapper>
        }
      />
      <Route path={RoutePaths.HOME} index element={<Navigate to={RoutePaths.APPS} replace />} />
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
