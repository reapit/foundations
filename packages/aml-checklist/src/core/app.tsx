import { PortalProvider } from '@reapit/elements'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import * as React from 'react'
import { ReapitConnectBrowserSession, ReapitConnectContext, useReapitConnect } from '@reapit/connect-session'

const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: window.reapit.config.cognitoClientId,
  connectOAuthUrl: window.reapit.config.cognitoOAuthUrl,
  connectLoginRedirectPath: '/',
  connectLogoutRedirectPath: '/login',
})

const App = () => {
  const session = useReapitConnect(reapitConnectBrowserSession)
  return (
    <ReapitConnectContext.Provider value={{ ...session }}>
      <Provider store={store.reduxStore}>
        <PortalProvider>
          <Router />
        </PortalProvider>
      </Provider>
    </ReapitConnectContext.Provider>
  )
}

export default App
