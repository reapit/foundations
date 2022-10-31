import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { Config } from '@/types/global'
import { getMarketplaceGlobalsByKey, logger } from '@reapit/utils-react'

// Init global config
window.reapit = {
  config: {
    appEnv: 'production',
    sentryDsn: '',
    keycloakConnectClientId: '',
    oryConnectClientId: '',
    cognitoConnectClientId: '',
    connectUserPoolId: '',
  },
}

export const renderApp = (Component: FC) => {
  const rootElement = document.querySelector('#root') as Element
  const isDesktop = getMarketplaceGlobalsByKey()
  const html = document.querySelector('html')
  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }
  if (window.location.href.includes('developer')) {
    document.title = 'Developers'
  }
  if (rootElement) {
    createRoot(rootElement).render(<Component />)
  }
}

const run = async () => {
  try {
    const configName = process.env.NODE_ENV === 'production' ? `config.${process.env.APP_VERSION}.json` : 'config.json'
    const configRes = await fetch(configName)
    const config = (await configRes.json()) as Config

    const isLocal = config.appEnv !== 'production'
    if (!isLocal && config.sentryDsn) {
      Sentry.init({
        integrations: [new BrowserTracing()],
        release: process.env.APP_VERSION,
        dsn: config.sentryDsn,
        environment: config.appEnv,
        tracesSampleRate: 1.0,
      })
    }

    window.reapit.config = {
      ...window.reapit.config,
      ...config,
    }

    const { default: App } = await import('./app')
    renderApp(App)
  } catch (error: any) {
    logger(error)
  }
}

if (module['hot']) {
  module['hot'].accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}

run()
