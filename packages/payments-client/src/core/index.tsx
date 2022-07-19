import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga'
import { Config } from '../types/global'
import { getMarketplaceGlobalsByKey, logger } from '@reapit/utils-react'

// Init global config
window.reapit = {
  config: {
    appEnv: 'local',
    sentryDns: '',
    connectClientId: '',
    connectUserPoolId: '',
    googleAnalyticsKey: '',
    connectOAuthUrl: '',
    configServiceUrl: '',
    platformApiUrl: '',
    paymentApiUrl: '',
    graphqlUri: '',
    marketplaceUrl: '',
    paymentsApiUrl: '',
    emailApiUrl: '',
    opayo: {
      SBOX: {
        integrationKey: '',
        passKey: '',
        vendorName: '',
      },
    },
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  const isDesktop = getMarketplaceGlobalsByKey()
  const html = document.querySelector('html')
  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }

  if (rootElement) {
    createRoot(rootElement).render(<Component />)
  }
}

const run = async () => {
  try {
    const configRes = await fetch('config.json')
    const config = (await configRes.json()) as Config
    const isLocal = config.appEnv !== 'production'

    if (!isLocal && config.sentryDns) {
      Sentry.init({
        integrations: [new BrowserTracing()],
        release: process.env.APP_VERSION,
        dsn: config.sentryDns,
        environment: config.appEnv,
        tracesSampleRate: 1.0,
      })
    }

    if (!isLocal && config.googleAnalyticsKey) {
      ReactGA.initialize(config.googleAnalyticsKey)
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    window.reapit.config = config

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./app')

    renderApp(App)
  } catch (error) {
    logger(error as Error)
  }
}

if (module['hot']) {
  module['hot'].accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}

run()
