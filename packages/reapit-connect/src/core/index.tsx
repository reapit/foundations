/* istanbul ignore file */
import React from 'react'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { createRoot } from 'react-dom/client'
import { Config } from '@/types/global'
import { logger } from '@reapit/utils-react'

// Init global config
window.reapit = {
  config: {
    appId: '',
    appEnv: 'production',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    developerPortalUrl: '',
    sentryDns: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element

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
      })
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
