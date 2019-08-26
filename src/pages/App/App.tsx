import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ROUTES } from '@/constants/index'

// eslint disable-next-line
const Home = React.lazy((): Promise<{ default: any }> => import('@/pages/Home')) // eslint-disable-line

const App: React.FC = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={null}>
        <Switch>
          <Route
            path={ROUTES.HOME}
            exact={true}
            render={(): React.ReactElement => <Home />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
