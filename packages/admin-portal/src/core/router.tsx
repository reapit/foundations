import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { catchChunkError, Login, OkayPage } from '@reapit/utils-react'
import RoutePaths from '../constants/routes'
import { createBrowserHistory, History } from 'history'
import { PageContainer, PersistentNotification } from '@reapit/elements'
import { reapitConnectBrowserSession } from './connect-session'

export const history: History = createBrowserHistory()

const PrivateRouteWrapper = React.lazy(() => catchChunkError(() => import('./private-route-wrapper')))
const ApprovalsPage = React.lazy(() => catchChunkError(() => import('../components/approvals')))
const DevsManagementPage = React.lazy(() => catchChunkError(() => import('../components/developers')))
const AppsManagementPage = React.lazy(() => catchChunkError(() => import('../components/apps')))
const InstallationsPage = React.lazy(() => catchChunkError(() => import('../components/installations')))
const BillingPage = React.lazy(() => catchChunkError(() => import('../components/billing')))
const CustomersPage = React.lazy(() => catchChunkError(() => import('../components/customers')))
const SubscriptionsPage = React.lazy(() => catchChunkError(() => import('../components/subscriptions')))
const UsagePage = React.lazy(() => catchChunkError(() => import('../components/usage')))
const TrafficPage = React.lazy(() => catchChunkError(() => import('../components/traffic')))
const IaaSPage = React.lazy(() => catchChunkError(() => import('../components/iaas')))

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
      <Route
        path={RoutePaths.LOGIN}
        element={
          <Login
            appName="Developer Admin Portal"
            reapitConnectBrowserSession={reapitConnectBrowserSession}
            redirectPath={RoutePaths.APPROVALS}
          />
        }
      />
      <Route path={RoutePaths.FOUR_O_FOUR} element={<FourOFour />} />
      <Route
        path={RoutePaths.BILLING}
        element={
          <PrivateRouteWrapper>
            <BillingPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.TRAFFIC}
        element={
          <PrivateRouteWrapper>
            <TrafficPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.USAGE}
        element={
          <PrivateRouteWrapper>
            <UsagePage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.APPROVALS}
        element={
          <PrivateRouteWrapper>
            <ApprovalsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.APPS}
        element={
          <PrivateRouteWrapper>
            <AppsManagementPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.DEV_MANAGEMENT}
        element={
          <PrivateRouteWrapper>
            <DevsManagementPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.INSTALLATIONS}
        element={
          <PrivateRouteWrapper>
            <InstallationsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.CUSTOMERS}
        element={
          <PrivateRouteWrapper>
            <CustomersPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.SUBSCRIPTIONS}
        element={
          <PrivateRouteWrapper>
            <SubscriptionsPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.IAAS}
        element={
          <PrivateRouteWrapper>
            <IaaSPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={RoutePaths.ROOT}
        element={
          <PrivateRouteWrapper>
            <AppsManagementPage />
          </PrivateRouteWrapper>
        }
      />
    </Routes>
  )
}

const Router: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)

export default Router
