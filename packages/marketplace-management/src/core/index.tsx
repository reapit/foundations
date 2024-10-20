import React from 'react'
import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import { getMarketplaceGlobalsByKey } from '@reapit/utils-react'
import App from './app'
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom'

const rootElement = document.querySelector('#root') as Element
const isDesktop = getMarketplaceGlobalsByKey()
const html = document.querySelector('html')
const isLocal = process.env.appEnv !== 'production'

if (!isLocal && process.env.sentryDsn) {
  Sentry.init({
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    release: process.env.APP_VERSION,
    dsn: process.env.sentryDsn,
    environment: process.env.appEnv,
    tracesSampleRate: 1.0,
  })
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
