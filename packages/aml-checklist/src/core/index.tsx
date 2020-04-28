import '../styles/index.scss'
import * as Sentry from '@sentry/browser'
import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
import App from './app'
import { getSessionCookie } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_AML_APP } from '../constants/api'
import store from './store'
import { authSetRefreshSession } from '../actions/auth'

// Init global config
window.reapit = {
  config: {
    appId: '',
    appEnv: 'production',
    sentryDns: '',
    platformApiUrl: '',
    uploadApiUrl: '',
    cognitoClientId: '',
    googleAnalyticsKey: '',
    cognitoOAuthUrl: '',
    cognitoUserPoolId: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  const refreshSessionFromCookie = getSessionCookie(COOKIE_SESSION_KEY_AML_APP, window.reapit.config.appEnv)
  if (refreshSessionFromCookie) {
    store.dispatch(authSetRefreshSession(refreshSessionFromCookie))
  }
  if (rootElement) {
    render(<Component />, rootElement)
  }
}

const run = async () => {
  await fetch('config.json')
    .then(response => response.json())
    .then((config: Config) => {
      window.reapit.config = config
      const isLocal = config.appEnv === 'local'
      if (!isLocal && config.sentryDns) {
        Sentry.init({
          release: process.env.APP_VERSION,
          dsn: config.sentryDns,
          environment: config.appEnv,
        })
      }
      if (!isLocal && config.googleAnalyticsKey) {
        ReactGA.initialize(config.googleAnalyticsKey)
        ReactGA.pageview(window.location.pathname + window.location.search)
      }
      renderApp(App)
    })
    .catch(error => {
      console.error('Cannot fetch config', error)
    })
}

if (module['hot']) {
  module['hot'].accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}

run()
