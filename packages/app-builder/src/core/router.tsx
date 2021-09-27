import * as React from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { MainContainer } from '@reapit/elements'
import Menu from '../components/ui/nav'

export const history = createBrowserHistory()

export const catchChunkError = (
  fn: Function,
  retriesLeft = 3,
  interval = 500,
): Promise<{ default: React.ComponentType<any> }> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: Error) => {
        // Ignore chunk cache error and retry to fetch, if cannot reload browser
        console.info(error)
        setTimeout(() => {
          if (retriesLeft === 1) {
            window.location.reload()
            return
          }
          catchChunkError(fn, retriesLeft - 1, interval).then(resolve, reject)
        }, interval)
      })
  })
}

const HomePage = React.lazy(() => catchChunkError(() => import('../components/pages/home')))
const AppSelect = React.lazy(() => catchChunkError(() => import('../components/pages/app-select')))
const AppView = React.lazy(() => catchChunkError(() => import('../components/pages/app-view')))

const AppEditor = () => (
  <PrivateRouteWrapper>
    <MainContainer>
      <Menu />
      <Switch>
        <Route path={Routes.APP_VIEW} component={AppView} />
        <Route path={Routes.APP_EDIT} component={HomePage} />
        <Route path={Routes.APP_SELECT} component={AppSelect} />
      </Switch>
    </MainContainer>
  </PrivateRouteWrapper>
)

const AppViewer = () => (
  <PrivateRouteWrapper>
    <MainContainer>
      <Route path={Routes.APP_VIEW_ROOT} component={AppView} />
    </MainContainer>
  </PrivateRouteWrapper>
)

const EditorOrViewer = () => {
  const { location } = window
  if (location.hostname.includes('app-builder') || location.hostname.includes('localhost')) {
    return <AppEditor />
  } else {
    return <AppViewer />
  }
}

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <EditorOrViewer />
    </React.Suspense>
  </BrowserRouter>
)

export default Router
