import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'

export const history = createBrowserHistory()

// const LoginPage = React.lazy(() => import('../components/pages/login'))
// const HomePage = React.lazy(() => import('../components/pages/home'))
const UseQueryPage = React.lazy(() => import('../components/pages/use-query-page'))
const UseMutationPage = React.lazy(() => import('../components/pages/use-mutation-page'))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.USE_MUTATION_PAGE} component={UseMutationPage} />
        <Route path={Routes.USE_QUERY_PAGE} component={UseQueryPage} />
        <Redirect to={Routes.USE_QUERY_PAGE} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
