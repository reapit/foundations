import React from 'react'
import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import { getMarketplaceGlobalsByKey } from '@reapit/utils-react'
import App from './app'
import mixpanel from 'mixpanel-browser'

const rootElement = document.querySelector('#root') as Element
const isDesktop = getMarketplaceGlobalsByKey()
const html = document.querySelector('html')
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

if (process.env.mixPanelToken) {
  mixpanel.init(process.env.mixPanelToken, { debug: isLocal })
}

if (isDesktop && html) {
  html.classList.add('is-desktop')
}

if (window.location.href.includes('developer')) {
  document.title = 'Developers'
}

if (rootElement) {
  createRoot(rootElement).render(<App />)
}
