import '../styles/index.scss'
import * as Sentry from '@sentry/browser'
import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
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
    adminPortalUrl: '',
    previewExternalAppIds: [],
    previewFeaturedExternalAppIds: [],
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  const isDesktop = getMarketplaceGlobalsByKey()
  const html = document.querySelector('html')
  // FIXME: REMOVE this
  const refreshSessionFromCookie = getSessionCookie(COOKIE_SESSION_KEY_MARKETPLACE, window.reapit.config.appEnv)
  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }
  // FIXME: REMOVE this
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

// FIXME(cfg) Import config, import dynamid app
// TESTME: app run normal

// change to async
const run = async () => {
  try {
    const configRes = await fetch('config.json')
    const config = (await configRes.json()) as Config
    const isLocal = config.appEnv === 'local'

    window.reapit.config = config
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

    const { default: App } = await import('./app')

    // FIXME(cfg): app
    renderApp(App)
  } catch (err) {
    console.log('Error during render App', err)
  }
}

if (module['hot']) {
  module['hot'].accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}

run()
