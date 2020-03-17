import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()
import * as Sentry from '@sentry/browser'
import * as React from 'react'
import { render } from 'react-dom'
import { PortalProvider } from '@reapit/elements'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import '../styles/index.scss'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    release: process.env.APP_VERSION,
    dsn: process.env.SENTRY_PROJECT_URL_LTL_APP,
  })
}

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <Provider store={store.reduxStore}>
    <PortalProvider>
      <Router />
    </PortalProvider>
  </Provider>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
