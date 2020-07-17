import React from 'react'
import { render } from 'react-dom'
import { Config } from './types/global'
import App from './core/app'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'

// Init global config
window.reapit = {
  config: {
    appEnv: 'local',
    cognitoClientId: '',
    cognitoOAuthUrl: '',
    cognitoUserPoolId: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  const isDesktop = getMarketplaceGlobalsByKey()
  const html = document.querySelector('html')
  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }

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

run()
