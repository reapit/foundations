import * as Sentry from '@sentry/browser'
import { injectSwitchModeToWindow } from '@reapit/elements'
import load from 'little-loader'
import qs from 'query-string'
import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
import * as serviceWorker from './service-worker'
import { logger } from '@reapit/utils'

injectSwitchModeToWindow()

// Init global config
window.reapit = {
  config: {
    appEnv: 'production',
    sentryDns: '',
    googleAnalyticsKey: '',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    graphqlUri: '',
    googleMapApiKey: '',
    platformApiUrl: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  if (rootElement) {
    render(<Component />, rootElement)
  }
}

const GOOGLE_MAP_PLACES_API = 'https://maps.googleapis.com/maps/api/js'

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

    window.reapit.config = config

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./app')
    const params = {
      key: config.googleMapApiKey,
      libraries: '',
    }
    load(`${GOOGLE_MAP_PLACES_API}?${qs.stringify(params)}`, () => {
      renderApp(App)
    })
  } catch (error) {
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
if (process.env.NODE_ENV === 'development') {
  serviceWorker.unregister()
  console.info(`UnRegister-${process.env.APP_VERSION}`)
} else {
  serviceWorker.register()
  console.info(`Register-${process.env.APP_VERSION}`)
}
