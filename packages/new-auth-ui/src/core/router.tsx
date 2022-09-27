import * as React from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils-react'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory, History } from 'history'
import { OkayPage } from '@reapit/utils-react'
import { PageContainer, PersistentNotification } from '@reapit/elements'
import { FC } from 'react'

export const history: History<any> = createBrowserHistory()
const Login = React.lazy(() => catchChunkError(() => import('../components/login')))
const Landing = React.lazy(() => catchChunkError(() => import('../components/landing')))

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

          <PrivateRouteWrapper path="/">
            <Switch>
              <Route path={Routes.HOME} exact component={Landing} />
              <Route render={() => <FourOFour />} />
            </Switch>
          </PrivateRouteWrapper>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
