import React from 'react'
import { render } from 'react-dom'
import { Config } from '@/types/global'
import App from './app'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'
import config from '../../config.json'

// Init global config
window.reapit = {
  config: {
    appEnv: 'production',
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

const run = () => {
  window.reapit.config = config as Config    
  renderApp(App)
}

if (module['hot']) {
  module['hot'].accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}

run()
