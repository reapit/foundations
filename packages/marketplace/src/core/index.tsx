import '../styles/index.scss'
import * as Sentry from '@sentry/browser'
import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
import App from './app'
import { getSessionCookie } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '../constants/api'
import store from './store'
import { authSetRefreshSession } from '../actions/auth'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'

// Init global config
window.reapit = {
  config: {
    appEnv: 'production',
    sentryDns: '',
    marketplaceApiUrl: '',
    marketplaceApiKey: '',
    uploadApiUrl: '',
    swaggerUrl: '',
    elementDocumentUrl: '',
    cognitoClientId: '',
    googleAnalyticsKey: '',
    cognitoOAuthUrl: '',
    cognitoUserPoolId: '',
    chatbotAppId: '',
    marketplaceUrl: '',
    platformApiUrl: '',
    webComponentConfigApiUrl: '',
    developerEditionDownloadUrl: '',
    urlSchemeUrl: '',
    apiDocDesktop: '',
    developerPortalUrl: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  const isDesktop = getMarketplaceGlobalsByKey()
  const html = document.querySelector('html')
  const refreshSessionFromCookie = getSessionCookie(COOKIE_SESSION_KEY_MARKETPLACE, window.reapit.config.appEnv)
  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }
  if (refreshSessionFromCookie) {
    store.dispatch(authSetRefreshSession(refreshSessionFromCookie))
  }
  if (window.location.href.includes('developer')) {
    document.title = 'Developers'
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
