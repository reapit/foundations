import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import WelcomePage from '@/components/pages/welcome'
import LoginPage from '@/components/pages/welcome'

const Router = () => (
  <BrowserRouter>
    <React.Suspense fallback={null}>
      <Switch>
        <Route exact path={ROUTES.WELCOME} component={WelcomePage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
