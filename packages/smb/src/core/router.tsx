import * as React from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'

export const history = createBrowserHistory()

const LoginPage = React.lazy(() => import('../components/pages/login/login'))
const HomePage = React.lazy(() => import('../components/pages/home/home'))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <Route path={Routes.HOME} component={HomePage} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
