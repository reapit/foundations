import React from 'react'
import { render } from 'react-dom'
import { Config } from './types/global'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'
import config from './reapit.config.json'

// Init global config
window.reapit = {
  config: {
    appEnv: 'local',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    platformApiUrl: '',
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
  try {
    // Set the global config
    window.reapit.config = config as Config

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./core/app')

    renderApp(App)
  } catch (error) {
    console.error('Cannot fetch config', error)
  }
}

run()
