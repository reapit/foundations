import * as Sentry from '@sentry/browser'
import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
import { injectSwitchModeToWindow } from '@reapit/elements'

injectSwitchModeToWindow()

// Init global config
window.reapit = {
  config: {
    appEnv: 'production',
    sentryDns: '',
    graphqlUri: '',
    cognitoClientId: '',
    googleAnalyticsKey: '',
    cognitoOAuthUrl: '',
    cognitoUserPoolId: '',
    accessToken: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  if (rootElement) {
    render(<Component />, rootElement)
  }
}
/*
 * TODOME(installConnectSession)
 * update to lazyload app
 */

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
