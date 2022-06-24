import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import qs from 'query-string'
import { MainContainer } from '@reapit/elements'

import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { usePageId } from '@/components/hooks/use-page-id'
import { useApp } from '@/components/hooks/apps/use-app'
import { getReapitConnectBrowserSession } from './connect-session'
import { createClient } from './graphql-client'
import { ApolloProvider } from '@apollo/client'
import { useIntrospection } from '@/components/hooks/use-introspection'
import { getDesktopContext, unsetDesktopContext } from './desktop-integration'
import { useEffect } from 'react'

export const history: History<any> = createBrowserHistory()

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

const AppEditor = () => {
  const reapitConnectBrowserSession = getReapitConnectBrowserSession(window.reapit.config)
  return (
    <ApolloProvider client={createClient(reapitConnectBrowserSession)}>
      <PrivateRouteWrapper reapitConnectBrowserSession={reapitConnectBrowserSession}>
        <MainContainer>
          <Switch>
            <Route path={Routes.APP_VIEW} component={AppView} />
            <Route path={Routes.APP_EDIT} component={HomePage} />
            <Route path={Routes.APP_SELECT} component={AppSelect} />
          </Switch>
        </MainContainer>
      </PrivateRouteWrapper>
    </ApolloProvider>
  )
}

const AppViewer = () => {
  const { appId } = usePageId()
  const { app, loading } = useApp(appId)
  const { data } = useIntrospection()
  const [redirect, setRedirect] = React.useState('')

  useEffect(() => {
    if (!app || !data) {
      return
    }
    const { landingPage } = getDesktopContext(app, data)
    if (landingPage) {
      setRedirect(`/${landingPage.pageId}?${qs.stringify(landingPage.context)}`)
      unsetDesktopContext()
    }
  }, [app, data])

  if (loading || !app || !data) {
    return null
  }
  if (redirect) {
    return <Redirect to={redirect} />
  }

  const session = getReapitConnectBrowserSession({
    connectClientId: app.clientId,
    connectOAuthUrl: window.reapit.config.connectOAuthUrl,
    connectUserPoolId: window.reapit.config.connectUserPoolId,
  })

  return (
    <ApolloProvider client={createClient(session)}>
      <PrivateRouteWrapper reapitConnectBrowserSession={session}>
        <MainContainer>
          <Route path={Routes.APP_VIEW_ROOT} component={AppView} />
        </MainContainer>
      </PrivateRouteWrapper>
    </ApolloProvider>
  )
}

const EditorOrViewer = () => {
  const { location } = window
  if (location?.hostname?.startsWith('app-builder') || location?.hostname?.startsWith('localhost')) {
    return <AppEditor />
  } else {
    return <AppViewer />
  }
}

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Route path="/login" component={() => <Redirect to="/" />} />
      <Route path="/logout" component={() => <Redirect to="/" />} />
      <EditorOrViewer />
    </React.Suspense>
  </BrowserRouter>
)

export default Router
