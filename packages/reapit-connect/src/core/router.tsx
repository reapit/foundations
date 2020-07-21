import * as React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import WelcomePage from '@/components/pages/welcome'
import LoginPage from '@/components/pages/login'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.WELCOME} component={WelcomePage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Redirect to={ROUTES.WELCOME} />
    </Switch>
  </BrowserRouter>
)

export default Router
