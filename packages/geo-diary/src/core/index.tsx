import * as Sentry from '@sentry/browser'
import load from 'little-loader'
import qs from 'query-string'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga'
import { Config } from '../types/global'
import * as serviceWorker from './service-worker'
import { logger, injectSwitchModeToWindow } from '@reapit/utils-react'
import { GoogleMapsError } from '../components/ui/map/google-maps-error'
import { handleDemoAuth } from '../utils/demo-auth'

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
    amlAppId: '',
    amlAppUrl: '',
    demoUser: '',
    appId: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  if (rootElement) {
    createRoot(rootElement).render(<Component />)
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

    await handleDemoAuth()

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./app')
    const params = {
      key: config.googleMapApiKey,
      libraries: '',
    }

    // Ensure that Google maps SDK is loaded prior to the app first render
    load(`${GOOGLE_MAP_PLACES_API}?${qs.stringify(params)}`, (error: Error) => {
      if (!error) {
        return renderApp(App)
      }

      renderApp(GoogleMapsError)
    })
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
if (process.env.NODE_ENV === 'development') {
  serviceWorker.unregister()
  console.info(`UnRegister-${process.env.APP_VERSION}`)
} else {
  serviceWorker.register()
  console.info(`Register-${process.env.APP_VERSION}`)
}
