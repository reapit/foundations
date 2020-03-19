import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()
import React from 'react'
import * as Sentry from '@sentry/browser'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
import App from './app'
import { register } from './service-worker'
import '../styles/index.scss'

// Init global config
window.reapit = {
  config: {
    appEnv: 'production',
    sentryDns: '',
    platformApiUrl: '',
    uploadApiUrl: '',
    cognitoClientId: '',
    googleAnalyticsKey: '',
    googleMapApiKey: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
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

if (process.env.NODE_ENV === 'production') {
  register()
}

run()
