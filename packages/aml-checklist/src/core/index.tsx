import '../styles/index.scss'
import * as Sentry from '@sentry/browser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
import { getMarketplaceGlobalsByKey } from '@reapit/elements-legacy'
import { isDemo, logger } from '@reapit/utils-react'
import { DEMO_STORAGE_KEY } from '../constants/demo-storage'

// Init global config
window.reapit = {
  config: {
    appId: '',
    appEnv: 'production',
    sentryDns: '',
    googleAnalyticsKey: '',
    platformApiUrl: '',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    marketplaceUrl: '',
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
    const isLocal = config.appEnv === 'local'
    const demoEnv = isDemo()

    if (!isLocal && config.sentryDns && !window.location.hostname.includes('prod.paas')) {
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

    if (demoEnv) {
      window.sessionStorage.setItem(DEMO_STORAGE_KEY, 'true')
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
