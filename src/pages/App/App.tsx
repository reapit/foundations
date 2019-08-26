import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ROUTES } from '@constants/index'

const Home = React.lazy(() => import('@pages/Home'))

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={ROUTES.HOME} exact={true} render={() => <Home />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
