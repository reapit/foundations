/* istanbul ignore file */
import React from 'react'
import { render } from 'react-dom'
import { Config } from '@/types/global'
import App from './app'

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
  await fetch('config.json')
    .then(response => response.json())
    .then((config: Config) => {
      window.reapit.config = config
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

run()
