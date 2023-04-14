import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
// import { Config } from '../types/global'
import { getMarketplaceGlobalsByKey, logger } from '@reapit/utils-react'
import App from './app'

// Init global config
// window.reapit = {
//   config: {
//     appEnv: 'production',
//     sentryDsn: '',
//     connectClientId: '',
//     connectOAuthUrl: '',
//     connectUserPoolId: '',
//     chatbotAppId: '',
//     marketplaceUrl: '',
//     platformApiUrl: '',
//     developerEditionDownloadUrl: '',
//     adobeSignApiKey: '',
//     liveChatWhitelist: [],
//     elementsUri: '',
//     graphQLUri: '',
//     analyticsSchemaDocsUrl: '',
//     swaggerUri: '',
//     PUSHER_KEY: '',
//     DEPLOYMENT_SERVICE_HOST: '',
//     pipelineWhitelist: [],
//     swaggerWhitelist: [],
//   },
// }

export const renderApp = (Component: FC) => {
  const rootElement = document.querySelector('#root') as Element
  const isDesktop = getMarketplaceGlobalsByKey()
  const html = document.querySelector('html')
  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }
  if (window.location.href.includes('developer')) {
    document.title = 'Developers'
  }
  if (rootElement) {
    createRoot(rootElement).render(<Component />)
  }
}

const run = async () => {
  try {
    const isLocal = process.env.appEnv !== 'production'
    if (!isLocal && process.env.sentryDsn) {
      Sentry.init({
        integrations: [new BrowserTracing()],
        release: process.env.APP_VERSION,
        dsn: process.env.sentryDsn,
        environment: process.env.appEnv,
        tracesSampleRate: 1.0,
      })
    }

    renderApp(App)
  } catch (error: any) {
    logger(error)
  }
}

run()
