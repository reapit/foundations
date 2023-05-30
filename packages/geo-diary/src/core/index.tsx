import * as Sentry from '@sentry/react'
import load from 'little-loader'
import qs from 'query-string'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { logger, injectSwitchModeToWindow } from '@reapit/utils-react'
import { GoogleMapsError } from '../components/ui/map/google-maps-error'
import { handleDemoAuth } from '../utils/demo-auth'

injectSwitchModeToWindow()

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  if (rootElement) {
    createRoot(rootElement).render(<Component />)
  }
}

const GOOGLE_MAP_PLACES_API = 'https://maps.googleapis.com/maps/api/js'

const run = async () => {
  try {
    const isLocal = process.env.appEnv !== 'production'
    if (!isLocal && process.env.sentryDsn) {
      Sentry.init({
        integrations: [new Sentry.BrowserTracing()],
        release: process.env.APP_VERSION,
        dsn: process.env.sentryDsn,
        environment: process.env.appEnv,
        tracesSampleRate: 1.0,
      })
    }

    await handleDemoAuth()

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./app')
    const params = {
      key: process.env.googleMapApiKey,
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

run()
  .catch(error => console.error(error))
