import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'

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

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const AuthenticatedPage = React.lazy(() => catchChunkError(() => import('../components/pages/authenticated')))
const PipelineListPage = React.lazy(() => catchChunkError(() => import('../components/pages/pipelines/list')))
const ApiKeyListPage = React.lazy(() => catchChunkError(() => import('../components/pages/api-key/list')))
const ReleasesPage = React.lazy(() => catchChunkError(() => import('../components/pages/releases')))
const ReleaseProjectPage = React.lazy(() => catchChunkError(() => import('../components/pages/release-projects')))
const PipelineCreatePage = React.lazy(() => catchChunkError(() => import('../components/pages/pipelines/create')))
const PipelineUpdatePage = React.lazy(() => catchChunkError(() => import('../components/pages/pipelines/update')))
const PipelineShowPage = React.lazy(() => catchChunkError(() => import('../components/pages/pipelines/show')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <Switch>
            <Route path={Routes.HOME} exact component={AuthenticatedPage} />
            <Route path={Routes.PIPELINES} exact component={PipelineListPage} />
            <Route path={Routes.RELEASE_PROJECTS} exact component={ReleaseProjectPage} />
            <Route path={Routes.RELEASES} exact component={ReleasesPage} />
            <Route path={Routes.API_KEYS} exact component={ApiKeyListPage} />
            <Route path={Routes.PIPELINES_CREATION} exact component={PipelineCreatePage} />
            <Route path={Routes.PIPELINES_UPDATE} exact component={PipelineUpdatePage} />
            <Route path={Routes.PIPELINES_SHOW} exact component={PipelineShowPage} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
