import React, { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { Config } from '../types/global'
import * as Sentry from '@sentry/browser'
import ReactGA from 'react-ga'
import { getMarketplaceGlobalsByKey } from '@reapit/utils-react'
import { logger } from '@reapit/utils-react'

// Init global config
window.reapit = {
  config: {
    appEnv: 'local',
    sentryDns: '',
    googleAnalyticsKey: '',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    platformApiUrl: '',
    webComponentConfigApiUrl: '',
    developerPortalUrl: '',
    orgAdminRestrictedAppIds: [],
    adminRestrictedAppIds: [],
    reapitConnectManagementUri: '',
    comingSoonApps: [],
    clientHiddenAppIds: {},
  },
}

export const renderApp = (Component: ComponentType) => {
  const rootElement = document.querySelector('#root') || document.body
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

    // Set the global config
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
  module['hot'].accept()
}

run()
