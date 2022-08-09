import * as React from 'react'
import { Redirect, Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils-react'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory, History } from 'history'
import { OkayPage } from '@reapit/utils-react'
import { PageContainer, PersistentNotification } from '@reapit/elements'
import { FC } from 'react'

export const history: History<any> = createBrowserHistory()
const CustomerRegister = React.lazy(() => catchChunkError(() => import('../components/register/customer-register')))
const Login = React.lazy(() => catchChunkError(() => import('../components/login')))
const Register = React.lazy(() => catchChunkError(() => import('../components/register')))
const Apps = React.lazy(() => catchChunkError(() => import('../components/apps')))
const ApiPage = React.lazy(() => catchChunkError(() => import('../components/api')))
const ApiDocsPage = React.lazy(() => catchChunkError(() => import('../components/docs')))
const AnalyticsPage = React.lazy(() => catchChunkError(() => import('../components/analytics')))
const RegisterConfirm = React.lazy(() => catchChunkError(() => import('../components/register/register-confirm')))
const SettingsPage = React.lazy(() => catchChunkError(() => import('../components/settings')))
const Invite = React.lazy(() => catchChunkError(() => import('../components/register/invite')))
const ElementsPage = React.lazy(() => catchChunkError(() => import('../components/elements')))
const SelectRolePage = React.lazy(() => catchChunkError(() => import('../components/login/select-role')))
const IaaS = React.lazy(() => catchChunkError(() => import('../components/iaas')))
const DeveloperEditionDownload = React.lazy(() =>
  catchChunkError(() => import('../components/desktop/developer-edition-download')),
)

export const FourOFour: FC = () => (
  <PageContainer>
    <PersistentNotification isFullWidth isInline isExpanded intent="danger">
      Page not found
    </PersistentNotification>
  </PageContainer>
)

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={Routes.OK} exact render={() => <OkayPage />} />
          <Route path={Routes.LOGIN} exact render={() => <Login />} />
          <Route path={Routes.REGISTER} exact render={() => <Register />} />
          <Route path={Routes.REGISTER_LEGACY} render={() => <Redirect to={Routes.SELECT_ROLE} />} />
          <Route path={Routes.SELECT_ROLE} exact component={SelectRolePage} />
          <Route path={Routes.REGISTER_CONFIRM} exact component={RegisterConfirm} />
          <Route path={Routes.FOUR_O_FOUR} exact render={() => <FourOFour />} />
          <Route path={Routes.INVITE} component={Invite} />
          <PrivateRouteWrapper path="/">
            <Switch>
              <PrivateRoute path={Routes.CUSTOMER_REGISTER} exact component={CustomerRegister} />
              <PrivateRoute path={Routes.APPS} component={Apps} />
              <PrivateRoute path={Routes.ANALYTICS} component={AnalyticsPage} />
              <PrivateRoute path={Routes.API_DOCS} component={ApiDocsPage} />
              <PrivateRoute path={Routes.ANALYTICS_SCHEMA_DOCS} component={ApiDocsPage} />
              <PrivateRoute path={Routes.WEBHOOKS} component={ApiPage} />
              <PrivateRoute path={Routes.WEBHOOKS_MANAGE} component={ApiPage} />
              <PrivateRoute path={Routes.WEBHOOKS_ABOUT} component={ApiPage} />
              <PrivateRoute path={Routes.WEBHOOKS_NEW} component={ApiPage} />
              <PrivateRoute path={Routes.WEBHOOKS_LOGS} component={ApiPage} />
              <PrivateRoute path={Routes.SWAGGER} exact component={ApiPage} />
              <PrivateRoute path={Routes.DESKTOP} exact component={ApiPage} />
              <PrivateRoute path={Routes.GRAPHQL} component={ApiPage} />
              <PrivateRoute path={Routes.SETTINGS} component={SettingsPage} />
              <PrivateRoute path={Routes.ELEMENTS} exact component={ElementsPage} />
              <PrivateRoute path={Routes.IAAS} exact component={IaaS} />
              <PrivateRoute path={Routes.DEVELOPER_EDITION_DOWNLOAD} exact component={DeveloperEditionDownload} />
              <Route render={() => <FourOFour />} />
            </Switch>
          </PrivateRouteWrapper>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
