/* istanbul ignore file */
import React from 'react'
import { render } from 'react-dom'
import { Config } from '@/types/global'
import { logger } from '@reapit/utils'

// Init global config
window.reapit = {
  config: {
    appId: '',
    appEnv: 'production',
    cognitoClientId: '',
    cognitoOAuthUrl: '',
    cognitoUserPoolId: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element

  if (rootElement) {
    render(<Component />, rootElement)
  }
}

const run = async () => {
  try {
    const configRes = await fetch('config.json')
    const config = (await configRes.json()) as Config

    window.reapit.config = config

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./app')
    renderApp(App)
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
