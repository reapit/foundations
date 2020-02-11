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

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    release: process.env.APP_VERSION,
    dsn: process.env.SENTRY_PROJECT_URL_MARKETPLACE,
  })
}

if (process.env.NODE_ENV !== 'development' && process.env.MARKETPLACE_GOOGLE_ANALYTICS_KEY) {
  ReactGA.initialize(process.env.MARKETPLACE_GOOGLE_ANALYTICS_KEY)
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
