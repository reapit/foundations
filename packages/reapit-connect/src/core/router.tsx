import * as React from 'react'
import { ErrorBoundary } from '@/components/hocs/error-boundary'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import WelcomePage from '@/components/pages/welcome'
import LoginPage from '@/components/pages/login'

export const Router = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.WELCOME} component={WelcomePage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Redirect to={ROUTES.LOGIN} />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
)

export default Router
