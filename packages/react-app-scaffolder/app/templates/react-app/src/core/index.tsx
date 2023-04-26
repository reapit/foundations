import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { createRoot } from 'react-dom/client'
import { Config } from '../types/global'
import { getMarketplaceGlobalsByKey } from '@reapit/utils-react'
import { logger } from '@reapit/utils-react'

// Init global config
window.reapit = {
  config: {
    appEnv: 'local',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    platformApiUrl: '',
    marketplaceUrl: '',
    sentryDsn: '',
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

    // Set the global config
    process.env = config

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./app')

    renderApp(App)
  } catch (error) {
    logger(error)
  }
}

run()
