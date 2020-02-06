import '../styles/index.scss'
import * as Sentry from '@sentry/browser'
import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import ToastMessage from '../components/ui/toast-message'
import { PortalProvider } from '@reapit/elements'
import ReactGA from 'react-ga'

const { NODE_ENV, MARKETPLACE_GOOGLE_ANALYTICS_KEY, SENTRY_PROJECT_URL } = process.env

if (NODE_ENV !== 'development' && SENTRY_PROJECT_URL) {
  Sentry.init({ dsn: (SENTRY_PROJECT_URL as any).MARKETPLACE })
}

if (NODE_ENV !== 'development' && MARKETPLACE_GOOGLE_ANALYTICS_KEY) {
  ReactGA.initialize(MARKETPLACE_GOOGLE_ANALYTICS_KEY)
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <Provider store={store.reduxStore}>
    <PortalProvider>
      <Router />
    </PortalProvider>
    <Toast />
    <ToastMessage />
  </Provider>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
