import * as React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import qs from 'query-string'
import { MainContainer } from '@reapit/elements'

import RoutePaths from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { usePageId } from '@/components/hooks/use-page-id'
import { useAppWithPages } from '@/components/hooks/apps/use-app'
import { getReapitConnectBrowserSession } from './connect-session'
import { createClient, unauthenticatedClient } from './graphql-client'
import { ApolloProvider } from '@apollo/client'
import { useIntrospection } from '@/components/hooks/use-introspection'
import { getDesktopContext, unsetDesktopContext } from './desktop-integration'
import { useEffect } from 'react'
import { isEditor } from './config'
import { Login, catchChunkError } from '@reapit/utils-react'

const HomePage = React.lazy(() => catchChunkError(() => import('../components/pages/home')))
const AppSelect = React.lazy(() => catchChunkError(() => import('../components/pages/app-select')))
const AppView = React.lazy(() => catchChunkError(() => import('../components/pages/app-view')))

const reapitConnectBrowserSession = getReapitConnectBrowserSession(process.env)
const client = createClient(reapitConnectBrowserSession)
const AppEditor = () => {
  return (
    <ApolloProvider client={client}>
      <MainContainer>
        <BrowserRouter>
          <Routes>
            <Route
              path={RoutePaths.LOGIN}
              element={<Login appName="App Builder" reapitConnectBrowserSession={reapitConnectBrowserSession} />}
            />
            <Route
              path="/logout"
              element={
                <PrivateRouteWrapper reapitConnectBrowserSession={reapitConnectBrowserSession}>
                  <Navigate to="/" />
                </PrivateRouteWrapper>
              }
            />
            <Route
              path={RoutePaths.APP_EDIT}
              element={
                <PrivateRouteWrapper reapitConnectBrowserSession={reapitConnectBrowserSession}>
                  <HomePage />
                </PrivateRouteWrapper>
              }
            />
            <Route
              path={RoutePaths.APP_SELECT}
              element={
                <PrivateRouteWrapper reapitConnectBrowserSession={reapitConnectBrowserSession}>
                  <AppSelect />
                </PrivateRouteWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </MainContainer>
    </ApolloProvider>
  )
}

const AppViewer = () => {
  const { appId } = usePageId()
  const { app, loading } = useAppWithPages(appId, unauthenticatedClient)
  const { data } = useIntrospection(unauthenticatedClient)
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

  const session =
    app &&
    getReapitConnectBrowserSession({
      connectClientId: app.clientId,
      connectOAuthUrl: process.env.connectOAuthUrl,
      connectUserPoolId: process.env.connectUserPoolId,
      connectLogoutRedirectPath: `${window.location.protocol}//${window.location.host}/`,
    })

  const memoisedClient = React.useMemo(() => {
    return createClient(session)
  }, [session])

  if (loading || !app || !data || !session) {
    return null
  }
  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <ApolloProvider client={memoisedClient}>
      <MainContainer>
        <BrowserRouter>
          <Routes>
            <Route
              path={RoutePaths.LOGIN}
              element={<Login appName="App Builder" reapitConnectBrowserSession={reapitConnectBrowserSession} />}
            />
            <Route
              path="/logout"
              element={
                <PrivateRouteWrapper reapitConnectBrowserSession={session}>
                  <Navigate to="/" />
                </PrivateRouteWrapper>
              }
            />
            <Route
              path={RoutePaths.APP_VIEW_ROOT}
              element={
                <PrivateRouteWrapper reapitConnectBrowserSession={session}>
                  <AppView />
                </PrivateRouteWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </MainContainer>
    </ApolloProvider>
  )
}

const EditorOrViewerRouter = () => {
  if (isEditor()) {
    return <AppEditor />
  } else {
    return <AppViewer />
  }
}

export default EditorOrViewerRouter
